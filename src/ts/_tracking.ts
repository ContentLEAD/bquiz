module bGraphics{
    export class googleAnalyticsTracking {
        category;
        label;
        value;
        _analytics;
        _ga;
        constructor(obj){
            this.category = obj.category;
            this.label = obj.title;
            this._analytics = window["_gaq"] || null;
            this._ga = window["ga"] || null;
        }

        next(val = ""){
            console.log("tracking next");
            if(this._ga){
                this._ga("send", "event", this.category, "next Question "+val, this.label)
            }else if(this._analytics){
                this._analytics.push(['_trackEvent', this.category, "next Question " +val, this.label]);
            }
        }

        finished(){
            console.log("tracking finished");
            if(this._ga){
               this._ga("send", "event", this.category, "Quiz completed", this.label)
            }else if(this._analytics){
                this._analytics.push(['_trackEvent', this.category, "Quiz completed", this.label]);
            }
        }

        cta(){
            console.log("tracking cta click");
            if(this._ga){
                this._ga("send", "event", this.category, "Call to Action", this.label)
            }else if(this._analytics){
                this._analytics.push(['_trackEvent', this.category, "Call to Action", this.label]);
            }
        }
        custom(action, category = this.category, label = this.label){
            console.log("track custom event");
            if(!action){
                console.warn("You have not provided an action for tracking");
            }
            if(this._ga){
                this._ga("send", "event", category, action, label)
            }else if(this._analytics){
                this._analytics.push(['_trackEvent', category, action, label]);
            }
        }
    }
}