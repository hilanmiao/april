const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  user: state => state.auth.user,
  accessToken: state => state.auth.accessToken,
  refreshToken: state => state.auth.refreshToken,
  powerMenus: state => state.user.powerMenus,
  powerOperations: state => state.user.powerOperations,
  myRoutes: state => state.router.myRoutes
}
export default getters
