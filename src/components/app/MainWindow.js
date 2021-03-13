import React, {Component} from "react"
import {Route, Switch} from "react-router-dom"
import PropTypes from 'prop-types'
import {
    getRouteCreate,
    getRouteDetailsPath,
    getRouteList,
    getRouteUpdatePath,
    routeHome
} from "../../utils/RouterUtils";
import {HomePage} from "../home/HomePage";
import {RegionListPage} from "../region/RegionListPage";
import {RegionDetailsPage} from "../region/RegionDetailsPage";
import {AreaDetailsPage} from "../area/AreaDetailsPage";
import {AreaListPage} from "../area/AreaListPage";
import {TownListPage} from "../town/TownListPage";
import {TownDetailsPage} from "../town/TownDetailsPage";
import {UserListPage} from "../user/UserListPage";
import {UserDetailsPage} from "../user/UserDetailsPage";
import {RegionCreatePage} from "../region/RegionCreatePage";
import {AreaCreatePage} from "../area/AreaCreatePage";
import {TownCreatePage} from "../town/TownCreatePage";
import {UserCreatePage} from "../user/UserCreatePage";
import {MenuNames} from "../../utils/Constants";
import {UserGroupListPage} from "../user_group/UserGroupListPage";
import {UserGroupCreatePage} from "../user_group/UserGroupCreatePage";
import {UserGroupDetailsPage} from "../user_group/UserGroupDetailsPage";

class MainWindow extends Component {
    render() {
        const location = this.props.location
        return (
           <div style={{overflowY:"auto", height:"100%"}}>
               <Switch>
                   <Route location={location} path={routeHome} component={HomePage} />


                   <Route location={location} path={getRouteList(MenuNames.region.lower)} component={RegionListPage} />
                   <Route location={location} path={getRouteCreate(MenuNames.region.lower)} component={RegionCreatePage}/>
                   <Route location={location} path={getRouteUpdatePath(MenuNames.region.lower)} render = {(props) => <RegionCreatePage edit {...props}  />} />
                   <Route location={location} path={getRouteDetailsPath(MenuNames.region.lower)} component={RegionDetailsPage}/>


                   <Route location={location} path={getRouteList(MenuNames.area.lower)} component={AreaListPage} />
                   <Route location={location} path={getRouteCreate(MenuNames.area.lower)} component={AreaCreatePage}/>
                   <Route location={location} path={getRouteUpdatePath(MenuNames.area.lower)} render = {(props) => <AreaCreatePage edit {...props}  />} />
                   <Route location={location} path={getRouteDetailsPath(MenuNames.area.lower)} component={AreaDetailsPage}/>

                   <Route location={location} path={getRouteList(MenuNames.town.lower)} component={TownListPage} />
                   <Route location={location} path={getRouteCreate(MenuNames.town.lower)} component={TownCreatePage}/>
                   <Route location={location} path={getRouteUpdatePath(MenuNames.town.lower)} render = {(props) => <TownCreatePage edit {...props}  />} />
                   <Route location={location} path={getRouteDetailsPath(MenuNames.town.lower)} component={TownDetailsPage}/>

                   <Route location={location} path={getRouteList(MenuNames.user.lower)} component={UserListPage} />
                   <Route location={location} path={getRouteCreate(MenuNames.user.lower)} component={UserCreatePage}/>
                   <Route location={location} path={getRouteUpdatePath(MenuNames.user.lower)} render = {(props) => <UserCreatePage edit {...props}  />} />
                   <Route location={location} path={getRouteDetailsPath(MenuNames.user.lower)} component={UserDetailsPage}/>

                   <Route location={location} path={getRouteList(MenuNames.user_group.lower)} component={UserGroupListPage} />
                   <Route location={location} path={getRouteCreate(MenuNames.user_group.lower)} component={UserGroupCreatePage}/>
                   <Route location={location} path={getRouteUpdatePath(MenuNames.user_group.lower)} render = {(props) => <UserGroupCreatePage edit {...props}  />} />
                   <Route location={location} path={getRouteDetailsPath(MenuNames.user_group.lower)} component={UserGroupDetailsPage}/>

                   {/*_add_from_here*/}
                   {/*<Route location={location} component={Home} />*/}
               </Switch>
           </div>

        )
    }
}

MainWindow.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default MainWindow