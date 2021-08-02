import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import HomePage from './pages/home';
import AboutPage from './pages/about';
import AddProduct from './pages/admin/products/AddProduct';
import LayOutAdmin from './layouts/LayOutAdmin';
import LayOutWebsite from './layouts/LayOutWebsite';
import ProductDetail from './pages/products/ProductDetail';
import CategoryDetail from './pages/category/CategoryDetail';
import Dashboard from './pages/admin/dashboard';
import SignIn from './users/SignIn';
import SignUp from './users/SignUp';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import ListCategory from './pages/admin/category/ListCategory';
import ListProduct from './pages/admin/products/ListProduct';
import ListUser from './pages/admin/users/ListUser';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import UpdateProduct from './pages/admin/products/UpdateProduct';
import Contact from './pages/Contact';
import ColorList from './pages/admin/products/ColorList';
import AddColor from './pages/admin/products/AddColor';
import SizeList from './pages/admin/products/SizeList';
import AddSize from './pages/admin/products/AddSize';
import ContactList from './pages/admin/Contact';
import UserInfor from './pages/UserInfor';
import Cart from './pages/Cart';


const Routers = (props) => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/admin/:path?">
                        <LayOutAdmin {...props}>
                            <Switch>
                                <Route path="/admin/dashboard">
                                    <Dashboard {...props} />
                                </Route>
                                {/* ADD */}
                                <Route exact path="/admin/addproduct">
                                    <AddProduct {...props} />
                                </Route>
                                <Route exact path="/admin/addcategory">
                                    <CategoryAdd {...props} />
                                </Route>
                                <Route exact path="/admin/colorlist">
                                    <ColorList />
                                </Route>
                                <Route exact path="/admin/addcolor">
                                    <AddColor/>
                                </Route>
                                <Route exact path="/admin/sizelist">
                                    <SizeList />
                                </Route>
                                <Route exact path="/admin/addsize">
                                    <AddSize/>
                                </Route>
                                {/* LIST */}
                                <Route exact path="/admin/listcategory">
                                    <ListCategory {...props} />
                                </Route>
                                <Route exact path="/admin/listproducts">
                                    <ListProduct {...props} />
                                </Route>
                                <Route exact path="/admin/listusers">
                                    <ListUser />
                                </Route>
                                <Route exact path="/admin/contact">
                                    <ContactList />
                                </Route>
                                {/* UPDATE */}
                                <Route exact path="/admin/category/update/:id">
                                    <UpdateCategory />
                                </Route>
                                <Route exact path="/admin/product/update/:id">
                                    <UpdateProduct />
                                </Route>
                                <Route exact path="*">
                                    404 ERRORS PAGE.
                                </Route>
                            </Switch>
                        </LayOutAdmin>
                    </Route>

                    <Route>
                        <LayOutWebsite {...props}>
                            <Switch>
                                <Route exact path="/">
                                    <HomePage {...props} />
                                </Route>
                                <Route exact path="/about" component={AboutPage} />
                                
                                <Route exact path="/contact">
                                    <Contact />
                                </Route>
                                <Route exact path="/signin">
                                    <SignIn {...props} />
                                </Route>
                                <Route exact path="/userinfor">
                                    <UserInfor />
                                </Route>
                                <Route exact path="/signup">
                                    <SignUp />
                                </Route>
                                <Route exact path="/category/:id">
                                    <CategoryDetail />
                                </Route>
                                <Route exact path="/product/:id">
                                    <ProductDetail {...props} />
                                </Route>
                                <Route exact path="/cart">
                                    <Cart {...props} />
                                </Route>
                                <Route path="*">
                                    Error 404. Not Found Page
                                </Route>
                            </Switch>
                        </LayOutWebsite>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}
export default Routers;
