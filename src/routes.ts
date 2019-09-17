import { CategoryController } from "./controller/CategoryController";
import { CityController } from "./controller/CityController";
import { DistrictController } from "./controller/DistrictController";
import { WardController } from "./controller/WardController";
import { ImageController } from "./controller/ImageController";
import { ItemController } from "./controller/ItemController";
import { AccountController } from "./controller/AccountController";
import { AuthController } from "./controller/AuthController";
import { ProfileController } from "./controller/ProfileController";

export const Routes = [
    {
        method: "post",
        route: "/api/priv/images/upload",
        controller: ImageController,
        action: "upload"
    },
    {
    method: "post",
    route: "/api/priv/categories",
    controller: CategoryController,
    action: "save"
},
{
    method: "get",
    route: "/api/categories",
    controller: CategoryController,
    action: "getTrees"
},
{
    method: "post",
    route: "/api/priv/cities",
    controller: CityController,
    action: "save"
},
{
    method: "post",
    route: "/api/priv/districts",
    controller: DistrictController,
    action: "save"
},
{
    method: "post",
    route: "/api/priv/wards",
    controller: WardController,
    action: "save"
},
{
    method: "post",
    route: "/api/priv/items",
    controller: ItemController,
    action: "save"
},
{
    method: "get",
    route: "/api/items/search",
    controller: ItemController,
    action: "search"
},


{
    method: "post",
    route: "/api/auth/login",
    controller: AuthController,
    action: "login"
},
{
    method: "post",
    route: "/api/reset-verification",
    controller: ItemController,
    action: "save"
},
{
    method: "post",
    route: "/api/accounts/register",
    controller: AccountController,
    action: "register"
},
{
    method: "get",
    route: "/api/priv/profiles",
    controller: ProfileController,
    action: "get"
},
{
    method: "post",
    route: "/api/priv/profiles",
    controller: ProfileController,
    action: "update"
}

];