/**
 *
 */
var Provider = Provider || (function(){
        return {
            set: function(directive, fn){
                this.directives[directive] = fn;
            },

            get: function(directive){
                if(this.directives[directive]){
                    return this.directives[directive];
                }else{
                    return null;
                }
            },

            directives: [],
        };
    })();

Provider.set('ngl-controller', function($scope, DB){
    console.log($scope.todo);
    console.log(DB.getTodoList());
});
Provider.set('ngl-model', function(){
    console.log('model');
});
Provider.set('ngl-click', function(){
    console.log('click');
});
/**
 *
 * @type {{bootstrap, compile, _getDirectives}}
 */

var Compiler = Compiler || (function(){
        return {
            bootstrap: function(el){
                this._getDirectives(el);
            },

            compile: function(){

            },

            _getDirectives: function(el){
                var attrs = el.attributes;
                console.log(el);
                var directives = [];
                for(i=0; i<attrs.length; i++){
                    if(Provider.get(attrs[i].name)){
                        console.log('yes');
                        var fn = Provider.get(attrs[i].name);
                        var params = fn.toString().match(/function\s.*?\(([^)]*)\)/)[1];
                        params = params.split(',').map(function(arg) {
                            // Ensure no inline comments are parsed and trim the whitespace.
                            return arg.replace(/\/\*.*\*\//, '').trim();
                        });
                        console.log(params);
                        fn.call(this, {todo:"彭小康"}, {getTodoList: function(){return [1,2,3,4]}});
                    }else{
                        console.log('no');
                    }
                }
                //recursive
                var children = el.children;

                for(i = 0; i<children.length; i++){
                    // this._getDirectives.call(null, children[i]);
                     return (function (el,s) {
                        s._getDirectives(el);
                    }(children[i], this));
                    // this._getDirectives
                    // (this._getDirectives(newEl))(children[i]);
                    // console.log(children[i]);
                }
                // console.log(children);
                // console.log(children[0].attributes);
                // var childAttrs = children[0].attributes;
                //
                // for(i=0; i<childAttrs.length; i++){
                //     if(Provider.get(childAttrs[i].name)){
                //         console.log('in');
                //         var fn = Provider.get(attrs[i].name);
                //         var params = fn.toString().match(/function\s.*?\(([^)]*)\)/)[1];
                //         params = params.split(',').map(function(arg) {
                //             // Ensure no inline comments are parsed and trim the whitespace.
                //             return arg.replace(/\/\*.*\*\//, '').trim();
                //         });
                //         console.log(params);
                //         fn.call(this, {todo:"彭小康"}, {getTodoList: function(){return [1,2,3,4]}});
                //     }else{
                //         console.log('yes');
                //     }
                // }

            }
        };
    })();

Compiler.bootstrap(document.children[0].children[1].children[0]);
