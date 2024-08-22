import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Switch>
        {/* <Route path={`${AUTH_PREFIX_PATH}/absen`} component={lazy(() => import(`./authentication/absen`))} /> */}
        <Route path={`${AUTH_PREFIX_PATH}/login`} component={lazy(() => import(`./authentication/login`))} />
        <Route path={`${AUTH_PREFIX_PATH}/qr-code`} component={lazy(() => import(`./authentication/qr-code`))} />
        <Route path={`${AUTH_PREFIX_PATH}/off`} component={lazy(() => import(`./authentication/lapor-off`))} />
        <Redirect from={`${AUTH_PREFIX_PATH}`} to={`${AUTH_PREFIX_PATH}/login`} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;

