import React, { useState, useEffect } from "react";

import MapView from "~/app/_components/map";

import { api } from "~/trpc/server";

export default async function Home() {
  const [locations, setLocations] = useState([]);

  // const locations = await api.agol.get({ bbox: "bbox" });

  console.log(locations);

  return (
    <>
      <main className="">
        <MapView />
      </main>
    </>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
