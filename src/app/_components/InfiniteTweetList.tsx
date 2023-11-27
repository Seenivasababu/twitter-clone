import React from "react";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number
  likedByMe: boolean
  user : {id:string; image:string|null; name:string|null}
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

const InfiniteTweetList = ({ tweets,isLoading ,isError, hasMore,fetchNewTweets }: InfiniteTweetListProps) => {
   if(isLoading) return <h1>Loading..</h1>
   if(isError) return <h1>Error..</h1>
   if(tweets == null || tweets.length ===0) return <h2 className="text-2xl text-center my-4">You have no tweets</h2>

   return <div>InfiniteTweetList</div>;
};

export default InfiniteTweetList;
