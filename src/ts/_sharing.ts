module bGraphics{
    export class sharing{
        private currentUrl = window.location.href;
        url;
        constructor(){

        }
        freshWindow(url){
            window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=500');
        }
        share(obj){
            var {network} = obj;
            let url = this[network]({
                "img": obj.img || "",
                "title": obj.title || ""
            });
            this.freshWindow(url);
        }
        setUrl(url){
            this.currentUrl = url;
        }
        facebook(obj){
            return "http://www.facebook.com/sharer/sharer.php?u="+ this.currentUrl;
            
        }
        twitter(obj){
            return"https://twitter.com/intent/tweet?original_referer=" + this.currentUrl + "&url=" + this.currentUrl;
            
        }
        linkedin(obj){
            
            return"https://www.linkedin.com/cws/share?url=" + this.currentUrl;
        }
        googleplus(obj){
            
            return"https://plus.google.com/share?url=" + this.currentUrl;
        }
        pinterest(obj){
            var img = obj.img? obj.img : "";
            var desc = obj.title? obj.title: "";
            return "https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&description=[post-title]";
        }
        reddit(obj){
            return "http://reddit.com/submit?url=[post-url]&title=[post-title]";
        }
        mail(obj){

            //var url = "$email = 'mailto:?subject=' . $[post-title] . '&body=Check out this site: '. $[post-url] .'" title="Share by Email';";
        }
    }
}