/// <reference path="../../typings/index.d.ts"/>
module bGraphics {
    export class archForm{
        feedId;
        brand;
        formId;
        constructor(obj){
            this.feedId = obj.feedId;
            this.brand = obj.brand;
            this.formId = obj.formId;
            this.renderPumpkin();
        }
        renderPumpkin(){
            var tmp = `<a id="bGraphicArch" href="javascript:void(0)" data-br-form-id="${this.formId}" class="br-form-link" style="display:none;"></a>`;
            var el = jQuery(tmp);
            jQuery("body").append(el);
            jQuery("body").append(`<script>
	(function(w,pk){var s=w.createElement('script');s.type='text/javascript';s.async=true;s.src='//pumpkin.${this.brand}.com/pumpkin.js';var f=w.getElementsByTagName('script')[0];f.parentNode.insertBefore(s,f);if(!pk.__S){window._pk=pk;pk.__S = 1.1;}pk.host='conversion.${this.brand}.com';pk.clientId='${this.feedId}';})(document,window._pk||[])
</script>`);
        }
        cta(){
            console.log("trigger arch");
            var el = jQuery("#bGraphicArch");
            el.trigger("click");
        }
    }
}