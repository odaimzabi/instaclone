import { dedupExchange, fetchExchange, gql, stringifyVariables,createClient,subscriptionExchange} from "urql";
import { cacheExchange, DataField, NullArray, Resolver, Variables } from '@urql/exchange-graphcache';
import { CreatePostMutation, DeletePostMutationVariables, LoginMutation, MeDocument, MeQuery, PaginatePostsDocument, PaginatePostsQuery } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import getToken from "./getToken";
import { SubscriptionClient } from 'subscriptions-transport-ws';
import login from "../pages/login";



const subscriptionClient = process.browser? new SubscriptionClient('wss://instaclone-backend-graphql.herokuapp.com/', { reconnect: true,connectionParams:{
  authorization:`bearer ${getToken()}`
},lazy:true}):null; 
console.log(subscriptionClient)
export const simplePagination = (): Resolver => {

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }


    let results:string[]=[]

    const fieldKey=`${fieldName}(${stringifyVariables(fieldArgs)})`
    const checkCache=cache.resolve(entityKey,fieldKey)
    info.partial=!checkCache
    fieldInfos.map((item)=>{
        if (item.fieldName=="paginatePosts"){

                const key = cache.resolve(entityKey, item.fieldKey) as string;
                const data = cache.resolve(key,"posts") as string[];
                if (data==null){
                  return undefined
                }
                results.push(...data)
        }
    })

   
      return {
          __typename:"PostsResponse",
          posts:results
      }
  };
};




export const urqlClient=(ssrExchange:any,_ctx:any)=>({
    url:"https://instaclone-backend-graphql.herokuapp.com/graphql",
    fetchOptions:{
        credentials:"include" as const,
        headers:{
          authorization:getToken()?`bearer ${getToken()}`:""
        }
    },
    
    exchanges:[dedupExchange, cacheExchange({
      
        updates:{
          Mutation:{
            login:(result,args,cache,info)=>betterUpdateQuery<LoginMutation,MeQuery>(cache,{query:MeDocument},result,(result,query)=>{
                  if (!result?.login){
                    return query
                  }else{
                    return { 
                        me:result.login.user as any
                    }
                  }
            }),
            createPost:(result,args,cache,info)=>{
             const allFields=cache.inspectFields("Query")
             const fields=allFields.filter((item)=>item.fieldName=="paginatePosts")
             fields.forEach((fi)=>{
               cache.invalidate("Query","paginatePosts",fi.arguments||{})
             })
            },
            editPost:(result,args,cache,info)=>{
              const post=cache.readFragment(gql`
                    fragment _ on PostEntity{
                      id
                      details
                      creator
                    }
              `,{id:args.id})
              post.details=args.details
              cache.writeFragment(gql`
              fragment __ on PostEntity{
                id
                details
                creator
              }`,{...post})
            },
            acceptRequest:(result,args,cache,info)=>{
               const me= cache.readQuery({query:MeDocument,variables:null}) as any
               console.log(me,args)
              me.me.Requests=me.me.Requests.filter((item:any)=>item.id!=args.id)
              
               console.log(me)
               cache.updateQuery({query:MeDocument,variables:null},(data)=>{
                 return me
               })
            },
            deleteRequest:(result,args,cache,info)=>{
              const me= cache.readQuery({query:MeDocument,variables:null}) as any
              me.me.Requests=me.me.Requests.filter((item:any)=>item.id!=args.id)
               console.log(me)
               cache.updateQuery({query:MeDocument,variables:null},(data)=>{
                 return me
               })
              },
              deletePost:(result,args,cache,info)=>{
                 const queries=cache.inspectFields("Query")
                 const cachedPosts=queries.filter((item)=>item.fieldName=="paginatePosts")
                 const postsArgs=cachedPosts[0].arguments
                let posts=cache.readQuery({query:PaginatePostsDocument,variables:postsArgs}) as any
                posts.paginatePosts.posts=posts.paginatePosts.posts.filter((item:any)=>item.id!=args.id)
                console.log(posts)
                cache.updateQuery({query:PaginatePostsDocument,variables:postsArgs},(data)=>{
                  data=posts
                  console.log(data)

                  return data
                })
              }
              
          },
         
          Subscription:{
            followRequestSent:(result,args,cache,info)=>{ 
              const allFields=cache.resolve("me","me")
              console.log(allFields)
              const data=cache.readFragment(gql`
                fragment _ on User{
                  id
                  Requests{
                    id
                    userId
                    from
                  }
                }


              `,{id:result.userId})

              console.log(data)
            },
          }
        },
       
        resolvers:{
          Query:{
              paginatePosts:simplePagination()
          }
        }
      }),fetchExchange,ssrExchange,dedupExchange,subscriptionExchange({

        forwardSubscription(operation) {
          return subscriptionClient?.request(operation) as any
        },

      })],
})