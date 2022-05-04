import React from "react";

const Post = React.lazy(() => import("./views/theme/colors/User/post/Post"));
const Read = React.lazy(() => import("./views/theme/colors/User/post/Read"));
const Update = React.lazy(() =>
  import("./views/theme/colors/User/post/Update")
);
const View = React.lazy(() => import("./views/theme/colors/User/post/View"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/theme/post", name: "User", element: Post },
  { path: "/theme/post/read", name: "Read", element: Read },
  { path: "/theme/post/update/:id", name: "Update", element: Update },
  { path: "/theme/post/view/:id", name: "View", element: View },
];

export default routes;
