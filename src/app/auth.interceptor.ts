import { HttpInterceptor } from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor{

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        let patternregister=req.url.match("/register");
        let patternlogin=req.url.match("/login");

        console.log(sessionStorage.getItem("token"));
        if(patternlogin!=null || patternregister!=null || sessionStorage.getItem("token")===null){
          
        }else{
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          });
        }
        return next.handle(req);
    }

    
}