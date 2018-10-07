export const defaultHtml = `<!--  You can import stylesheets -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
<header class="header">
	<h1>Foo Bar</h1>
	<h2>Frontend Developer</h2>
</header>
<main>
	<section class="section experience">
		<h3 class="section__title">Experience</h3>
		<article class="experience-item">
			<header class="experience-item__header">
				<h4 class="experience-item__title">Awesome Company | Frontend Tech Lead</h4>
				<span class="experience-item__dates">01.2018 - now</span>
			</header>
			<p class="experience-item__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
		</article>
	</section>
</main>
<ul class="contact-list fa-ul">
	<li class="contact-list__item">
		<span class="fa-li" ><i class="fas fa-phone"></i></span>
		<a href="tel:123123123123">123 123 123 123</a>
	</li>
	<li class="contact-list__item">
		<span class="fa-li" ><i class="fas fa-envelope"></i></span>
		<a href="mailto:contact@example.com">contact@example.com</a>
	</li>
</ul>`;

export const defaultCss = `/* You can import fonts */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #172436;
  padding: 20px;
}

a {
  text-decoration: none;
  color: #172436;
}

.header {
  text-align: center;
  border-bottom: 1px solid;
}

.experience-item__header {
  display: flex;
  justify-content: space-between;
}

.experience-item__title {
  margin: 0;
}

.experience-item__description {
  text-align: justify;
}

.contact-list__item {
  margin-bottom: 10px;
}`;
