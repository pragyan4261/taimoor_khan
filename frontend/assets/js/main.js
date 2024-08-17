// About Me content is the one by default shown
$('#educationContent').hide();
$('#journalsContent').hide();
$('#patentsContent').hide();
$('#booksContent').hide();
$('#bookChaptersContent').hide();
$('#conferencesContent').hide();
$('#academicContent').hide();
$('#adminContent').hide();
$('#collaborationContent').hide();
$('#talksContent').hide();
$('#projectsContent').hide();
$('#mtechContent').hide();
$('#phdContent').hide();
$('#btechContent').hide();
$('#professionalContent').hide();
$('#editorialContent').hide();
$('#ieeeContent').hide();
$('#awardsContent').hide();
$('#galleryContents').hide();
$('#academicContent').hide();
$('#particularContent').hide();
$('#profiles').hide();
/* Template
$('#nameContent').hide();
*/
$('#theme').hide();
$('#lan').hide();

// Hides all the divs in the particular, unless the first one
$('.particular-clickable').next().hide();
$('.particular-clickable').next()[0].style.display = "block";


document.addEventListener("DOMContentLoaded", function () {
	// Add event listeners to all nav links
	var navLinks = document.querySelectorAll(".Link");
	navLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			// Check if the window width is less than or equal to 768px
			if (window.innerWidth <= 768) {
				// Close the navbar
				var navbarToggle = document.querySelector(".navbar-toggler");
				navbarToggle.click();
			}
		});
	});
});


$(document).ready(function(){

	$.getJSON("https://api.countapi.xyz/hit/nicolasmeseguer.github.io/634c2142-b35d-430e-b51c-dad16880dd3a", function(response) {
		$("#contadorVisitas").text(response.value);
	});

	// First time, check the theme
	if(localStorage.getItem("theme") === null){
		localStorage.theme = "light";
		if (window.matchMedia('(prefers-color-scheme: dark)').matches)
			localStorage.theme = "dark";
	}
	
	// First time, check the locale
	let userLang = navigator.language || navigator.userLanguage;
	if(localStorage.getItem("lan") === null){
		localStorage.lan = "en";
		if (userLang.split('-')[0] == "es")
			localStorage.lan = "es";
	}

	// Maybe first time or not, so load the localStorage value
	$('<link>').appendTo('head').attr({
		type: 'text/css', 
		rel: 'stylesheet',
		href: 'assets/css/light.css'
	});
	if (localStorage.theme == "dark") {
		// Handle menu
		$("link[href='assets/css/light.css']").remove();
		$('<link>').appendTo('head').attr({
			type: 'text/css', 
			rel: 'stylesheet',
			href: 'assets/css/dark.css'
		});
		$('#theme').empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");
	}
	// Done because light is the one by default
	if(localStorage.lan == "es") {
		$('#lan img').attr("src","/assets/img/es_flag.webp");
		$('#lan').addClass("es");
	}
	updateLanguage();

	// Handle 'About Me' content
	$('#aboutme').click(function(e) {

		
		// If the div has already the class active, no need to reload the divs...
		if (!$(e.target).hasClass('active')) {
			console.log('about me');
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#aboutmeContent');
		}

	});

	// Handle 'Education' content
	$('#education').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#educationContent');
		}
	});

	// Handle 'Publications' content
	$('#journals').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#journalsContent');
		}
	});
	$('#patents').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#patentsContent');
		}
	});
	
	$('#books').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#booksContent');
		}
	});
	$('#bookchapters').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#bookChaptersContent');
		}
	});
	$('#conferences').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#conferencesContent');
		}
	});
	$('#teaching').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#academicContent');
		}
	});
	$('#admin').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#adminContent');
		}
	});
	$('#collaboration').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#collaborationContent');
		}
	});
	$('#talks').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#talksContent');
		}
	});
	$('#projects').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#projectsContent');
		}
	});
	$('#phd').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#phdContent');
		}
	});
	$('#mtech').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#mtechContent');
		}
	});
	$('#btech').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#btechContent');
		}
	});
	$('#professional').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#professionalContent');
		}
	});
	$('#editorial').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#editorialContent');
		}
	});
	$('#ieee').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#ieeeContent');
		}
	});
	$('#awards').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#awardsContent');
		}
	});

	$('#my_works').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#my_workscontent');
		}
	});


	// Handle 'Academic' content
	$('#academic').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#academicContent');
		}
	});

	// Handle 'Particular' content
	$('#particular').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#particularContent');
		}
	});



	// Handle 'Projects' content
	$('#gallery').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#galleryContents');
		}
	});
	// Handle 'Projects' content
	$('#update').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.target).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// // Show current content
			// activateDiv('#updateContent');
			// window.location.href = '/frontend/auth/login.html';
		}
	});

	
	// Whenever you clic on a blog post, you should be redirected to that post' html
	$('.clickable').click(function(e) {
		window.open($(e.currentTarget)[0].childNodes[1].innerText, '_blank').focus();
	});

	// Whenever you clic on a clases particulares heading, you should toggle
	$('.particular-clickable').click(function(e) {
		var e = $(e.currentTarget)[0].nextElementSibling;
		if (e.style.display === "none") {
			e.style.display = "block";
		}
		else {
			e.style.display = "none";
		}
	});

	// Copy the citation to the clipboard
	// THIS SHOULD BE THE SAME FOR ALL THE PAPERS
	$(document).on("click", "#citation", function(){
		var text = $(this).parent().parent().next()[0].innerHTML;

		navigator.clipboard.writeText(text);

		toastr.success('Citation copied');
	});

	// Controls the URL; if it has '#blog'
	// then trigger the 'Blog' clic
	// if (((window.location).href).substring(((window.location).href).lastIndexOf('#') + 1) == 'tutorials') {
	// 	$('#tutorials').click();
	// 	$('#tutorialsContent').focus();
	// }

	if (((window.location).href).substring(((window.location).href).lastIndexOf('#') + 1) == 'clases-particulares') {
		$('#particular').click();
		$('#particularContent').focus();
	}

	// Controls the options menu
	$('#options-toggler').click(function(e) {
		if(!$(e.currentTarget).hasClass('active')) {
			$(e.currentTarget).addClass('active');
			$('#theme').show("fast");
			$('#lan').show("fast");
		}
		else {
			$(e.currentTarget).removeClass('active');
			$('#theme').hide("fast");
			$('#lan').hide("fast");
		}
	})

	// Animates the theme button + functionality
	$('#theme').click(function(e) {
		if(localStorage.theme != "dark"){

			$('#theme').empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");

			localStorage.theme = "dark"
			
			$("link[href='assets/css/light.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css', 
				rel: 'stylesheet',
				href: 'assets/css/dark.css'
			});
		}
		else {

			$('#theme').empty().append("<i class='fa-duotone fa-lightbulb'></i>");

			localStorage.theme = "light"
			
			$("link[href='assets/css/dark.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css', 
				rel: 'stylesheet',
				href: 'assets/css/light.css'
			});
		}
	})

	// Animates the lan button + functionality
	$('#lan').click(function(e) {
		if(!$(e.currentTarget).hasClass('es')){
			$(e.currentTarget).addClass('es');

			$('#lan img').attr("src","/assets/img/es_flag.webp");

			localStorage.lan = "es"
		}
		else {
			$(e.currentTarget).removeClass('es');

			$('#lan img').attr("src","/assets/img/en_flag.webp");

			localStorage.lan = "en"
		}

		updateLanguage();
	})

});

function updateLanguage() {
	let lang = localStorage.lan;
	$(".language *").each(function(){
		$(this).html( $(this).data(lang) );
	});
}

function clearActiveLinks() {
	$('#navbarList .nav-item .nav-link').each(function() {
		$(this).removeClass('active');
	});
}

function clearActiveDivs() {
	$('.container .content .active ').each(function() {
		$(this).removeClass('active');
		$(this).hide();
	});
}

function activateLink(e) {
	$(e.target).addClass('active');
	
	// Hide left panel
	if(e.target.id == "particular")
		$('#leftPanel').hide();
	else
		$('#leftPanel').show();
}

function activateDiv(divId) {
	$(divId).addClass('active');
	$(divId).show();

	// Scrolls to the content
	scrollToContent(divId);
}

function scrollToContent(divId) {
	if ($(window).width() < 751) {
		$('html, body').animate({
			scrollTop: $(divId).offset().top
		}, 1);
	}
}

function resetViews() {
	$.getJSON("https://api.countapi.xyz/set/nicolasmeseguer.github.io/634c2142-b35d-430e-b51c-dad16880dd3a?value=0", function(response) {
		$("#contadorVisitas").text("0");
	});
}


