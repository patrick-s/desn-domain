/*
 Name: Patrick Sappington
 Assignment: 3 Page App
 Date: 11/14/2016
 */

// Setup

var previousDomains = localStorage.getItem("domains");
var domains = JSON.parse(previousDomains);
var firstTime = false;

if (!Array.isArray(domains)) {
    firstTime = true;
}

// Get a new domain and place in text
function getNewDomain() {
    // Replace current domain info with generating domain
    document.getElementById("domain").innerHTML = "Generating";
    document.getElementById("available").innerHTML = "Domain";

    // Grab JSON from API
    $.getJSON("http://domain.desn.pw/devs/frm/api.php", function (data) {
        // Update Domain Information on Page
        document.getElementById("domain").innerHTML = data.domain;
        document.getElementById("available").innerHTML = data.available;

        // Check if they have the taken class
        var hasClassDomain = $("#domain").hasClass("taken");
        var hasClassAvailable = $("#available").hasClass("taken");

        // If it's available, make sure it shows available colors.
        if (data.available == "AVAILABLE") {

            if (hasClassDomain === true) {
                $("#domain").removeClass("taken");
                $("#available").removeClass("taken");
            }
            // If it's taken, make sure it shows taken colors.
        } else if (data.available == "TAKEN") {
            if (hasClassDomain === false) {
                $("#domain").addClass("taken");
                $("#available").addClass("taken");
            }
        }

        if (!firstTime) {
            if (domains.length > 9) {
                domains.splice(-1, 1);
            }

            domains.unshift(data.domain);
        } else {
            domains = [data.domain];
        }

        localStorage.setItem("domains", JSON.stringify(domains));
    });
}

function lastTen() {
    var previousDom = localStorage.getItem("domains");
    var dom = JSON.parse(previousDom);
    document.getElementById("list-domains").innerHTML = "";
    for (domain in dom) {
        $("#list-domains").append("<div class='prev-domain'><a href='https://www.namecheap.com/domains/registration/results.aspx?domain=" + dom[domain] + "'>" + dom[domain] + "</a></option>");
    }
}

// Generate a new domain
$(".refresh").on("click", function () {
    getNewDomain(); // Generate new domain
    lastTen();
});


// Run this stuff when document is ready
$(document).ready(function () {
    // Generate domain when document is ready.
    getNewDomain();
    lastTen();
});