import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig' 
import PrivateRoute from 'components/custom-components/PrivateRoute'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <PrivateRoute path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-calendar`} component={lazy(() => import(`./my-calendar`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-calendar`} component={lazy(() => import(`./detail-calendar`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-karyawan`} component={lazy(() => import(`./detail-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-calendar`} component={lazy(() => import(`./detail-calendar`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-karyawan`} component={lazy(() => import(`./detail-karyawan`))} />
        
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-account`} component={lazy(() => import(`./account`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-report`} component={lazy(() => import(`./my-report`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-report-bulanan`} component={lazy(() => import(`./my-report-bulanan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-report-tahunan`} component={lazy(() => import(`./my-report-tahunan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-report-mingguan`} component={lazy(() => import(`./my-report-mingguan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-soda`} component={lazy(() => import(`./my-soda`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/my-performance`} component={lazy(() => import(`./my-performance`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
