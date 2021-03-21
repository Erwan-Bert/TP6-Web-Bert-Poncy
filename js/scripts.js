<!-- ------------- TP6 Application Web Poncy ALex - Bert Erwan ------------ -->
<!-- scripts.js-->

!function(){
    // ------------------------- Récupération des Flux ------------------------- //

    "use strict";
    const t=["doctype","html","head","title","base","link","meta","style","script","noscript","body","article","nav","aside","section","header","footer","h1-h6","hgroup","address","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","figure","figcaption","div","table","caption","thead","tbody","tfoot","tr","th","td","col","colgroup","form","fieldset","legend","label","input","button","select","datalist","optgroup","option","textarea","keygen","output","progress","meter","details","summary","command","menu","del","ins","img","iframe","embed","object","param","video","audio","source","canvas","track","map","area","a","em","strong","i","b","u","s","small","abbr","q","cite","dfn","sub","sup","time","code","kbd","samp","var","mark","bdi","bdo","ruby","rt","rp","span","br","wbr","description","link","media:content"];
    class e{constructor(){
        this.topics={},
            this.hop=this.topics.hasOwnProperty
    }

        on(t,e){
            this.hop.call(this.topics,t)||(this.topics[t]=[]);
            const i=this.topics[t].push(e)-1;
            return{remove:()=>{this.topics[t].splice(i,1)}}
        }

        emit(t,e={}){
            return this.hop.call(this.topics,t)?this.topics[t].forEach(t=>t(e)):this}
    }

    function i(t){
        let e=document.createElement("template");
        return e.innerHTML=t.trim(),e.content.firstElementChild
    }

    class s{
        constructor(t,i,s={})
        {this.version="1.4.0",
            this.target=t,this.urls=[].concat(i),this.html=[],this.options={ssl:!0,host:"www.feedrapp.info",support:!0,limit:null,key:null,layoutTemplate:"<ul>{entries}</ul>",entryTemplate:'<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',tokens:{},outputMode:"json",dateFormat:"dddd MMM Do",dateLocale:"en",offsetStart:!1,offsetEnd:!1,fetchFeed:null,encoding:null,...s},this.events=new e}on(t,e){return this.events.on(`vanilla-rss/${t}`,e),this}render(){return new Promise(async(t,e)=>{try{const t=await this._load();this.feed=t.responseData.feed,this.entries=t.responseData.feed.entries}
        catch(t){return this.entries=[],this.feed=null,e(t)}const i=this._generateHTMLForEntries();if(this.target.append(i.layout),0!==i.entries.length){this.events.emit("vanilla-rss/data",{rss:this,feed:this.feed,entries:this.entries});const t=function(t,e){return t.tagName.toLowerCase()===e.toLowerCase()}(i.layout,"entries")?i.layout:i.layout.querySelector("entries");this._appendEntries(t,i.entries)}t()})}_appendEntries(t,e){e.forEach((e,i)=>{var s=this._wrapContent(e);t.insertAdjacentHTML("beforebegin",s.outerHTML)}),t.remove()}_wrapContent(t){return 0!==t.trim().indexOf("<")?i(`<div>${t}</div>`):i(t)}_load(){const t=`${`http${this.options.ssl?"s":""}`}://${this.options.host}`,e={support:this.options.support,version:this.version,q:this.urls.map(t=>encodeURIComponent(t)).join(",")};this.options.offsetStart&&this.options.offsetEnd&&(this.options.limit=this.options.offsetEnd),null!==this.options.limit&&(e.num=this.options.limit),null!==this.options.key&&(e.key=this.options.key),null!==this.options.encoding&&(e.encoding=this.options.encoding),this.options.order&&(e.order=this.options.order);const i=`${t}?${Object.keys(e).map(t=>`${t}=${e[t]}`).join("&")}`;return this._fetchFeed(i)}async _fetchFeed(t){if(this.options.fetchFeed)return await this.options.fetchFeed(t);const e=await fetch(t,{headers:{"Content-Type":"application/json"}});return await e.json()}_generateHTMLForEntries(){const t={entries:[],layout:null};return this.entries.forEach((e,i)=>{const s=this.options.offsetStart,n=this.options.offsetEnd;let o;s&&n?i>=s&&i<=n&&this._isRelevant(e,t.entries)&&(o=this._evaluateStringForEntry(this.options.entryTemplate,e),t.entries.push(o)):this._isRelevant(e,t.entries)&&(o=this._evaluateStringForEntry(this.options.entryTemplate,e),t.entries.push(o))}),this.options.entryTemplate?t.layout=this._wrapContent(this.options.layoutTemplate.replace("{entries}","<entries></entries>")):t.layout=this._wrapContent("<div><entries></entries></div>"),t}_isRelevant(t,e){const i=this._getTokenMap(t);return!this.options.filter||(!this.options.filterLimit||this.options.filterLimit!==e.length)&&this.options.filter(t,i)}_evaluateStringForEntry(t,e){var i=t;return(t.match(/(\{.*?\})/g)||[]).forEach(t=>{i=i.replace(t,this._getValueForToken(t,e))}),i}_getFormattedDate(t){if(this.options.dateFormatFunction)return this.options.dateFormatFunction(t);if("undefined"!=typeof moment){var e=moment(new Date(t));return(e=e.locale?e.locale(this.options.dateLocale):e.lang(this.options.dateLocale)).format(this.options.dateFormat)}return t}_getTokenMap(e){if(!this.feedTokens){var i=JSON.parse(JSON.stringify(this.feed));delete i.entries,this.feedTokens=i}return{feed:this.feedTokens,url:e.link,author:e.author,date:this._getFormattedDate(e.publishedDate),title:e.title,body:e.content,shortBody:e.contentSnippet,bodyPlain:function(e){for(var i=e.content.replace(/<script[\\r\\\s\S]*<\/script>/gim,"").replace(/<\/?[^>]+>/gi,""),s=0;s<t.length;s++)i=i.replace(new RegExp("<"+t[s],"gi"),"");return i}(e),shortBodyPlain:e.contentSnippet.replace(/<\/?[^>]+>/gi,""),index:this.entries.indexOf(e),totalEntries:this.entries.length,teaserImage:function(t){try{return t.content.match(/(<img.*?>)/gi)[0]}catch(t){return""}}(e),teaserImageUrl:function(t){try{return t.content.match(/(<img.*?>)/gi)[0].match(/src=["'](.*?)["']/)[1]}catch(t){return""}}(e),...this.options.tokens}}_getValueForToken(t,e){var i=this._getTokenMap(e),s=i[t.replace(/[\{\}]/g,"")];if(void 0!==s)return"function"==typeof s?s(e,i):s;throw new Error("Unknown token: "+t+", url:"+this.url)}
    }

    var n;
    (n=jQuery).fn.rss=function(t,e={},i) {
        return new s(this,t,{...e,fetchFeed:t=>new Promise((e,i)=>{n.ajax({dataType:"json",url:t,success:e,error:i})})}).render().then((...t)=>{i&&i(...t),e&&e.success&&e.success(...t)},(...t)=>{e&&e.error&&e.error(...t)}),this
    }

    // ---- Alert ajout d'un flux - Récupération du flux et ajour sur la page
    $(document).ready(function (){
        $("#ajout").click(function () {
            let rss = window.prompt("entrez le flux");

            jQuery(function($) {
                $("#rss-flux").rss(rss, {
                    tokens: {
                        "link": function (entry, tokens) {
                            return entry.link;
                        },
                        "image": function (entry, tokens) {
                            return entry.media;
                        },
                    },
                    dateFormatFunction: function(date) {
                        return date.split("T")[0];
                    },
                    error: function() {
                        window.alert("le flux rss renseigné n'est pas valide")
                    },
                    limit: 10,
                    layoutTemplate: "{entries}, {description}",
                    entryTemplate:
                        "<div class=\"article\" id=\"article\">" +
                        "<div class=\"row justify-content-center\">" +
                        "<div class=\"col-sm-12\">" +
                        "<div class='entry'>" +
                        "   <h3>{title}</h3>" +
                        "   <div>" +
                        "       <p>{bodyPlain}</p>" +
                        "       <a href={link}><p>Voir l'article</p></a>" +
                        "       <a>Date : {date}</a>" +
                        "   </div>" +
                        "       </div>" +
                        "   </div>" +
                        "   </div>" +
                        "</div>" +
                        "</div>",
                    success: function (){
                        window.alert("Flux ajouté à la fin de la page");
                        document.getElementById('newFlux').scrollIntoView();
                    }
                });
            });
        });
    });

    // ---- Récupération du Flux LE MONDE tennis
    jQuery(function($) {
        $("#rss-feedstennis").rss("https://www.lemonde.fr/tennis/rss_full.xml", {
            tokens: {
                "link": function (entry, tokens) {
                    return entry.link;
                },
                "image": function (entry, tokens) {
                    return entry.media;
                },
            },
            dateFormatFunction: function(date) {
                return date.split("T")[0];
            },
            limit: 10,
            layoutTemplate: "{entries}, {description}",
            entryTemplate:
                "<div class=\"article\" id=\"article\">" +
                "<div class=\"row justify-content-center\">" +
                "<div class=\"col-sm-12\">" +
                "<div class='entry'>" +
                "   <h3>{title}</h3>" +
                "   <div>" +
                "       <p>{bodyPlain}</p>" +
                "       <a href={link}><p>Voir l'article</p></a>" +
                "       <a>Date : {date}</a>" +
                "   </div>" +
                "       </div>" +
                "   </div>" +
                "   </div>" +
                "</div>" +
                "</div>",
            success: function() {
                $(".entry").each(function(i, entry) {
                    $(entry).slideDown();
                });
            }
        });
    });

    // ---- Récupération du Flux LE MONDE basket
    jQuery(function($) {
        $("#rss-feedsbasket").rss("https://www.lemonde.fr/basket/rss_full.xml", {
            tokens: {
                "link": function (entry, tokens) {
                    return entry.link;
                },
                "image": function (entry, tokens) {
                    return entry.media;
                },
            },
            dateFormatFunction: function(date) {
                return date.split("T")[0];
            },
            limit: 10,
            layoutTemplate: "{entries}, {description}",
            entryTemplate:
                "<div class=\"article\" id=\"article\">" +
                "<div class=\"row justify-content-center\">" +
                "<div class=\"col-sm-12\">" +
                "<div class='entry'>" +
                "   <h3>{title}</h3>" +
                "   <div>" +
                "       <p>{bodyPlain}</p>" +
                "       <a href={link}><p>Voir l'article</p></a>" +
                "       <a>Date : {date}</a>" +
                "   </div>" +
                "       </div>" +
                "   </div>" +
                "   </div>" +
                "</div>" +
                "</div>" ,
            success: function() {
                $(".entry").each(function(i, entry) {
                    $(entry).slideDown();
                });
            }
        });
    });

    // ---- Récupération du Flux LE MONDE rugby
    jQuery(function($) {
        $("#rss-feedsrugby").rss("https://www.lemonde.fr/rugby/rss_full.xml", {
            tokens: {
                "link": function (entry, tokens) {
                    return entry.link;
                },
                "image": function (entry, tokens) {
                    return entry.media;
                },
            },
            dateFormatFunction: function(date) {
                return date.split("T")[0];
            },
            limit: 10,
            layoutTemplate: "{entries}, {description}",
            entryTemplate:
                "<div class=\"article\" id=\"article\">" +
                "<div class=\"row justify-content-center\">" +
                "<div class=\"col-sm-12\">" +
                "<div class='entry'>" +
                "   <h3>{title}</h3>" +
                "   <div>" +
                "       <p>{bodyPlain}</p>" +
                "       <a href={link}><p>Voir l'article</p></a>" +
                "       <a>Date : {date}</a>" +
                "   </div>" +
                "       </div>" +
                "   </div>" +
                "   </div>" +
                "</div>" +
                "</div>",
            success: function() {
                $(".entry").each(function(i, entry) {
                    $(entry).slideDown();
                });
            }
        });
    });

    // ---- Récupération du Flux LE MONDE football
    jQuery(function($) {
        $("#rss-feedsfoot").rss("https://www.lemonde.fr/football/rss_full.xml", {
            tokens: {
                "link": function (entry, tokens) {
                    return entry.link;
                },
                "image": function (entry, tokens) {
                    return entry.media;
                },
            },
            dateFormatFunction: function(date) {
                return date.split("T")[0];
            },
            limit: 10,
            layoutTemplate: "{entries}, {description}",
            entryTemplate:
                "<div class=\"article\" id=\"article\">" +
                "<div class=\"row justify-content-center\">" +
                "<div class=\"col-sm-12\">" +
                "<div class='entry'>" +
                "   <h3 class=\"Titre\" >{title}</h3>" +
                "   <div>" +
                "       <p>{bodyPlain}</p>" +
                "       <a class=\"voirArticle\" href={link}><p>Voir l'article</p></a>" +
                "       <a>Date : {date}</a>" +
                "   </div>" +
                "       </div>" +
                "   </div>" +
                "   </div>" +
                "</div>" +
                "</div>",
            success: function() {
                $(".entry").each(function(i, entry) {
                    $(entry).slideDown();
                });
            }
        });
    });

    // ------------------------- /Fin Récupération des flux ------------------------- //

    // ------------------------- Menu SCROLLSPY ------------------------- //
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 71)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    $(document).scroll(function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: 80
    });

    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);

    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    // ------------------------- /Fin Menu SCROLLSPY ------------------------- //

}();

  