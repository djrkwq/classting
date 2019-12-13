
lo(function(side_lo, appMgrList, plugin){

    side_lo.baseComponent.set('ajax', null, {
        ajax : function(url, datas, type, sucFn, errFn, options){

            if(typeof options !== 'object'){
                options = {};
            }

            return side_lo.ajax({
                url : url,
                inputData : datas,
                type : type,
                sended : type.toLowerCase().match(/post|put/gi) && true,
                success : sucFn,
                error : errFn,
                timeout : options.timeout || 5000,
                contentType : options.contentType,
                inputJson : options.inputJson,
                json : options.json,
                withCredentials : options.withCredentials,
                async : options.async
            });

            // return this;
        }
    });

});
