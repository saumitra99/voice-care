import React, { lazy, Suspense } from "react";
import Header from "./components/header";
import PageLoader from "./components/PageLoader";
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

const AllMessages = lazy(() => import("./containers/AllMessages"));
const EditMessage = lazy(() => import("./containers/EditMessage"));

function Routes() {
  const routes = [
    {
      id: 1,
      component: AllMessages,
      path: "/all-messages",
    },
    {
      id: 2,
      component: EditMessage,
      path: "/edit-message",
    },
  ];
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Header>
            {routes?.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                exact
                component={route.component}
              />
            ))}
            <Route path="/" exact>
              <Redirect to="/all-messages" />
            </Route>
          </Header>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Routes;
