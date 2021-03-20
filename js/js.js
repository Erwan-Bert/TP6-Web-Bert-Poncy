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
