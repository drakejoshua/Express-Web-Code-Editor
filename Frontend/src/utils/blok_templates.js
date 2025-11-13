// blok_templates.js
// This module defines and exports an array of blok templates used 
// throughout the application.
// Each template includes metadata such as name, value, description, 
// image, and placeholders for HTML, CSS, and JS code




// import template images
import portfolioImage from '../assets/blok_examples/blackandwhiteportfolio.png';
import businessConsultingImage from '../assets/blok_examples/business-consulting.png';
import gamerImage from '../assets/blok_examples/gamer.png';
import fashionImage from '../assets/blok_examples/kiyafashion.png';
import parallaxImage from '../assets/blok_examples/parallax.png';
import personalTrainerImage from '../assets/blok_examples/personaltrainer.png';
import waitlistImage from '../assets/blok_examples/soon.png';


// define and export blok templates array
// Each template object contains metadata and placeholders for HTML, CSS, and JS code
export const blokTemplates = [
    {
        name: "Black & White Portfolio",
        value: "portfolio",
        description: "A sleek and modern portfolio template with a black and white color scheme, perfect for showcasing your work.",
        image: portfolioImage,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>W3.CSS Template</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <style>
                body, h1,h2,h3,h4,h5,h6 {font-family: "Montserrat", sans-serif}
                .w3-row-padding img {margin-bottom: 12px}
                .bgimg {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('https://www.w3schools.com/w3images/profile_girl.jpg');
                min-height: 100%;
                }
                </style>
            </head>
            <body>

            <!-- Sidebar with image -->
            <nav class="w3-sidebar w3-hide-medium w3-hide-small" style="width:40%">
            <div class="bgimg"></div>
            </nav>

            <!-- Hidden Sidebar (reveals when clicked on menu icon)-->
            <nav class="w3-sidebar w3-black w3-animate-right w3-xxlarge" style="display:none;padding-top:150px;right:0;z-index:2" id="mySidebar">
            <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-black w3-xxxlarge w3-display-topright" style="padding:0 12px;">
                <i class="fa fa-remove"></i>
            </a>
            <div class="w3-bar-block w3-center">
                <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Home</a>
                <a href="#portfolio" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Portfolio</a>
                <a href="#about" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">About</a>
                <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Contact</a>
            </div>
            </nav>

            <!-- Page Content -->
            <div class="w3-main w3-padding-large" style="margin-left:40%">

            <!-- Menu icon to open sidebar -->
            <span class="w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black" style="width:auto;right:0;" onclick="openNav()"><i class="fa fa-bars"></i></span>

            <!-- Header -->
            <header class="w3-container w3-center" style="padding:128px 16px" id="home">
                <h1 class="w3-jumbo"><b>Jane Doe</b></h1>
                <p>Photographer and Web Designer.</p>
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-small w3-round" style="display:block;width:60%;margin:auto;">
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-medium w3-round" width="1000" height="1333">
                <button class="w3-button w3-light-grey w3-padding-large w3-margin-top">
                <i class="fa fa-download"></i> Download Resume
                </button>
            </header>

            <!-- Portfolio Section -->
            <div class="w3-padding-32 w3-content" id="portfolio">
                <h2 class="w3-text-grey">My Portfolio</h2>
                <hr class="w3-opacity">

                <!-- Grid for photos -->
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/rocks.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/sailboat.jpg" style="width:100%">
                </div>

                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/underwater.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/chef.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/p6.jpg" style="width:100%">
                </div>
                <!-- End photo grid -->
                </div>
            <!-- End Portfolio Section -->
            </div>

            <!-- About Section -->
            <div class="w3-content w3-justify w3-text-grey w3-padding-32" id="about">
                <h2>About</h2>
                <hr class="w3-opacity">
                <p>Some text about me. Some text about me. I am lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 class="w3-padding-16">My Skills</h3>
                <p class="w3-wide">Photography</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:95%">95%</div>
                </div>
                <p class="w3-wide">Web Design</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:85%">85%</div>
                </div>
                <p class="w3-wide">Photoshop</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:80%">80%</div>
                </div><br>

                <div class="w3-row w3-center w3-dark-grey w3-padding-16 w3-section">
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">14+</span><br>
                    Partners
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">55+</span><br>
                    Projects Done
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">89+</span><br>
                    Happy Clients
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">150+</span><br>
                    Meetings
                </div>
                </div>

                <button class="w3-button w3-light-grey w3-padding-large w3-section">
                <i class="fa fa-download"></i> Download Resume
                </button>

                <!-- Testimonials -->
                <h3 class="w3-padding-24">My Reputation</h3>
                <img src="https://www.w3schools.com/w3images/avatar_smoke.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chandler Bing.</span> Web Designer.</p>
                <p>Jane Doe is just awesome. I am so happy to have met her!</p><br>
            
                <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chris Fox.</span> CEO at Mighty Schools.</p>
                <p>Jane Doe saved us from a web disaster.</p><br>
                
                <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Rebecca Flex.</span> CEO at Company.</p>
                <p>No one is better than Jane Doe.</p><br>
                
                <!-- Grid for pricing tables -->
                <h3 class="w3-padding-16">My Price</h3>
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half w3-margin-bottom">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-dark-grey w3-xlarge w3-padding-32">Basic</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">5GB Storage</li>
                    <li class="w3-padding-16">Mail Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 10</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>

                <div class="w3-half">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-black w3-xlarge w3-padding-32">Pro</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">50GB Storage</li>
                    <li class="w3-padding-16">Endless Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 25</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>
                <!-- End Grid/Pricing tables -->
                </div>
                
            <!-- End About Section -->
            </div>

            <!-- Contact Section -->
            <div class="w3-padding-32 w3-content w3-text-grey" id="contact" style="margin-bottom:64px">
                <h2>Contact Me</h2>
                <hr class="w3-opacity">

                <div class="w3-section">
                <p><i class="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Chicago, US</p>
                <p><i class="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +00 151515</p>
                <p><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
                </div>
                
                <!-- Image of location/map -->
                <img src="https://www.w3schools.com/w3images/map.jpg" class="w3-image w3-greyscale" style="width:100%;margin:32px 0">
            
                <p>Lets get in touch. Send me a message:</p>
                <form action="/action_page.php" target="_blank">
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Subject" required name="Subject"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message"></p>
                <p>
                    <button class="w3-button w3-light-grey w3-padding-large" type="submit">
                    <i class="fa fa-paper-plane"></i> SEND MESSAGE
                    </button>
                </p>
                </form>
            <!-- End Contact Section -->
            </div>  
            
            <!-- Footer. This section contains an ad for W3Schools Spaces. You can leave it to support us. -->
            <footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style="margin:-24px">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
                <i class="fa fa-instagram w3-hover-opacity"></i>
                <i class="fa fa-snapchat w3-hover-opacity"></i>
                <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                <i class="fa fa-twitter w3-hover-opacity"></i>
                <i class="fa fa-linkedin w3-hover-opacity"></i>
                <p class="w3-small">This website was made with W3schools Spaces. Make your own free website today!</p>
                <a class="w3-button w3-round-xxlarge w3-small w3-dark-grey" href="https://www.w3schools.com/spaces" target="_blank">Start now</a>  
                <!-- End footer -->
            </footer>
            <!-- END PAGE CONTENT -->
            </div>

            <script>
            // Open and close sidebar
            function openNav() {
            document.getElementById("mySidebar").style.width = "60%";
            document.getElementById("mySidebar").style.display = "block";
            }

            function closeNav() {
            document.getElementById("mySidebar").style.display = "none";
            }
            </script>

            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Business Consulting",
        value: "business_consulting",
        description: "A professional and polished template designed for business consulting services, featuring a clean layout and modern design elements.",
        image: businessConsultingImage,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>W3.CSS Template</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <style>
                body, h1,h2,h3,h4,h5,h6 {font-family: "Montserrat", sans-serif}
                .w3-row-padding img {margin-bottom: 12px}
                .bgimg {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('https://www.w3schools.com/w3images/profile_girl.jpg');
                min-height: 100%;
                }
                </style>
            </head>
            <body>

            <!-- Sidebar with image -->
            <nav class="w3-sidebar w3-hide-medium w3-hide-small" style="width:40%">
            <div class="bgimg"></div>
            </nav>

            <!-- Hidden Sidebar (reveals when clicked on menu icon)-->
            <nav class="w3-sidebar w3-black w3-animate-right w3-xxlarge" style="display:none;padding-top:150px;right:0;z-index:2" id="mySidebar">
            <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-black w3-xxxlarge w3-display-topright" style="padding:0 12px;">
                <i class="fa fa-remove"></i>
            </a>
            <div class="w3-bar-block w3-center">
                <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Home</a>
                <a href="#portfolio" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Portfolio</a>
                <a href="#about" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">About</a>
                <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Contact</a>
            </div>
            </nav>

            <!-- Page Content -->
            <div class="w3-main w3-padding-large" style="margin-left:40%">

            <!-- Menu icon to open sidebar -->
            <span class="w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black" style="width:auto;right:0;" onclick="openNav()"><i class="fa fa-bars"></i></span>

            <!-- Header -->
            <header class="w3-container w3-center" style="padding:128px 16px" id="home">
                <h1 class="w3-jumbo"><b>Jane Doe</b></h1>
                <p>Photographer and Web Designer.</p>
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-small w3-round" style="display:block;width:60%;margin:auto;">
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-medium w3-round" width="1000" height="1333">
                <button class="w3-button w3-light-grey w3-padding-large w3-margin-top">
                <i class="fa fa-download"></i> Download Resume
                </button>
            </header>

            <!-- Portfolio Section -->
            <div class="w3-padding-32 w3-content" id="portfolio">
                <h2 class="w3-text-grey">My Portfolio</h2>
                <hr class="w3-opacity">

                <!-- Grid for photos -->
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/rocks.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/sailboat.jpg" style="width:100%">
                </div>

                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/underwater.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/chef.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/p6.jpg" style="width:100%">
                </div>
                <!-- End photo grid -->
                </div>
            <!-- End Portfolio Section -->
            </div>

            <!-- About Section -->
            <div class="w3-content w3-justify w3-text-grey w3-padding-32" id="about">
                <h2>About</h2>
                <hr class="w3-opacity">
                <p>Some text about me. Some text about me. I am lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 class="w3-padding-16">My Skills</h3>
                <p class="w3-wide">Photography</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:95%">95%</div>
                </div>
                <p class="w3-wide">Web Design</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:85%">85%</div>
                </div>
                <p class="w3-wide">Photoshop</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:80%">80%</div>
                </div><br>

                <div class="w3-row w3-center w3-dark-grey w3-padding-16 w3-section">
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">14+</span><br>
                    Partners
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">55+</span><br>
                    Projects Done
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">89+</span><br>
                    Happy Clients
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">150+</span><br>
                    Meetings
                </div>
                </div>

                <button class="w3-button w3-light-grey w3-padding-large w3-section">
                <i class="fa fa-download"></i> Download Resume
                </button>

                <!-- Testimonials -->
                <h3 class="w3-padding-24">My Reputation</h3>
                <img src="https://www.w3schools.com/w3images/avatar_smoke.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chandler Bing.</span> Web Designer.</p>
                <p>Jane Doe is just awesome. I am so happy to have met her!</p><br>
            
                <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chris Fox.</span> CEO at Mighty Schools.</p>
                <p>Jane Doe saved us from a web disaster.</p><br>
                
                <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Rebecca Flex.</span> CEO at Company.</p>
                <p>No one is better than Jane Doe.</p><br>
                
                <!-- Grid for pricing tables -->
                <h3 class="w3-padding-16">My Price</h3>
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half w3-margin-bottom">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-dark-grey w3-xlarge w3-padding-32">Basic</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">5GB Storage</li>
                    <li class="w3-padding-16">Mail Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 10</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>

                <div class="w3-half">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-black w3-xlarge w3-padding-32">Pro</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">50GB Storage</li>
                    <li class="w3-padding-16">Endless Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 25</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>
                <!-- End Grid/Pricing tables -->
                </div>
                
            <!-- End About Section -->
            </div>

            <!-- Contact Section -->
            <div class="w3-padding-32 w3-content w3-text-grey" id="contact" style="margin-bottom:64px">
                <h2>Contact Me</h2>
                <hr class="w3-opacity">

                <div class="w3-section">
                <p><i class="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Chicago, US</p>
                <p><i class="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +00 151515</p>
                <p><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
                </div>
                
                <!-- Image of location/map -->
                <img src="https://www.w3schools.com/w3images/map.jpg" class="w3-image w3-greyscale" style="width:100%;margin:32px 0">
            
                <p>Lets get in touch. Send me a message:</p>
                <form action="/action_page.php" target="_blank">
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Subject" required name="Subject"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message"></p>
                <p>
                    <button class="w3-button w3-light-grey w3-padding-large" type="submit">
                    <i class="fa fa-paper-plane"></i> SEND MESSAGE
                    </button>
                </p>
                </form>
            <!-- End Contact Section -->
            </div>  
            
            <!-- Footer. This section contains an ad for W3Schools Spaces. You can leave it to support us. -->
            <footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style="margin:-24px">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
                <i class="fa fa-instagram w3-hover-opacity"></i>
                <i class="fa fa-snapchat w3-hover-opacity"></i>
                <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                <i class="fa fa-twitter w3-hover-opacity"></i>
                <i class="fa fa-linkedin w3-hover-opacity"></i>
                <p class="w3-small">This website was made with W3schools Spaces. Make your own free website today!</p>
                <a class="w3-button w3-round-xxlarge w3-small w3-dark-grey" href="https://www.w3schools.com/spaces" target="_blank">Start now</a>  
                <!-- End footer -->
            </footer>
            <!-- END PAGE CONTENT -->
            </div>

            <script>
            // Open and close sidebar
            function openNav() {
            document.getElementById("mySidebar").style.width = "60%";
            document.getElementById("mySidebar").style.display = "block";
            }

            function closeNav() {
            document.getElementById("mySidebar").style.display = "none";
            }
            </script>

            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Gamer",
        value: "gamer",
        description: "A dynamic and engaging template tailored for gamers, with bold colors and interactive features to showcase gaming content.",
        image: gamerImage,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>W3.CSS Template</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <style>
                body, h1,h2,h3,h4,h5,h6 {font-family: "Montserrat", sans-serif}
                .w3-row-padding img {margin-bottom: 12px}
                .bgimg {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('https://www.w3schools.com/w3images/profile_girl.jpg');
                min-height: 100%;
                }
                </style>
            </head>
            <body>

            <!-- Sidebar with image -->
            <nav class="w3-sidebar w3-hide-medium w3-hide-small" style="width:40%">
            <div class="bgimg"></div>
            </nav>

            <!-- Hidden Sidebar (reveals when clicked on menu icon)-->
            <nav class="w3-sidebar w3-black w3-animate-right w3-xxlarge" style="display:none;padding-top:150px;right:0;z-index:2" id="mySidebar">
            <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-black w3-xxxlarge w3-display-topright" style="padding:0 12px;">
                <i class="fa fa-remove"></i>
            </a>
            <div class="w3-bar-block w3-center">
                <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Home</a>
                <a href="#portfolio" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Portfolio</a>
                <a href="#about" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">About</a>
                <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Contact</a>
            </div>
            </nav>

            <!-- Page Content -->
            <div class="w3-main w3-padding-large" style="margin-left:40%">

            <!-- Menu icon to open sidebar -->
            <span class="w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black" style="width:auto;right:0;" onclick="openNav()"><i class="fa fa-bars"></i></span>

            <!-- Header -->
            <header class="w3-container w3-center" style="padding:128px 16px" id="home">
                <h1 class="w3-jumbo"><b>Jane Doe</b></h1>
                <p>Photographer and Web Designer.</p>
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-small w3-round" style="display:block;width:60%;margin:auto;">
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-medium w3-round" width="1000" height="1333">
                <button class="w3-button w3-light-grey w3-padding-large w3-margin-top">
                <i class="fa fa-download"></i> Download Resume
                </button>
            </header>

            <!-- Portfolio Section -->
            <div class="w3-padding-32 w3-content" id="portfolio">
                <h2 class="w3-text-grey">My Portfolio</h2>
                <hr class="w3-opacity">

                <!-- Grid for photos -->
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/rocks.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/sailboat.jpg" style="width:100%">
                </div>

                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/underwater.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/chef.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/p6.jpg" style="width:100%">
                </div>
                <!-- End photo grid -->
                </div>
            <!-- End Portfolio Section -->
            </div>

            <!-- About Section -->
            <div class="w3-content w3-justify w3-text-grey w3-padding-32" id="about">
                <h2>About</h2>
                <hr class="w3-opacity">
                <p>Some text about me. Some text about me. I am lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 class="w3-padding-16">My Skills</h3>
                <p class="w3-wide">Photography</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:95%">95%</div>
                </div>
                <p class="w3-wide">Web Design</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:85%">85%</div>
                </div>
                <p class="w3-wide">Photoshop</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:80%">80%</div>
                </div><br>

                <div class="w3-row w3-center w3-dark-grey w3-padding-16 w3-section">
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">14+</span><br>
                    Partners
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">55+</span><br>
                    Projects Done
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">89+</span><br>
                    Happy Clients
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">150+</span><br>
                    Meetings
                </div>
                </div>

                <button class="w3-button w3-light-grey w3-padding-large w3-section">
                <i class="fa fa-download"></i> Download Resume
                </button>

                <!-- Testimonials -->
                <h3 class="w3-padding-24">My Reputation</h3>
                <img src="https://www.w3schools.com/w3images/avatar_smoke.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chandler Bing.</span> Web Designer.</p>
                <p>Jane Doe is just awesome. I am so happy to have met her!</p><br>
            
                <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chris Fox.</span> CEO at Mighty Schools.</p>
                <p>Jane Doe saved us from a web disaster.</p><br>
                
                <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Rebecca Flex.</span> CEO at Company.</p>
                <p>No one is better than Jane Doe.</p><br>
                
                <!-- Grid for pricing tables -->
                <h3 class="w3-padding-16">My Price</h3>
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half w3-margin-bottom">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-dark-grey w3-xlarge w3-padding-32">Basic</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">5GB Storage</li>
                    <li class="w3-padding-16">Mail Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 10</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>

                <div class="w3-half">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-black w3-xlarge w3-padding-32">Pro</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">50GB Storage</li>
                    <li class="w3-padding-16">Endless Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 25</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>
                <!-- End Grid/Pricing tables -->
                </div>
                
            <!-- End About Section -->
            </div>

            <!-- Contact Section -->
            <div class="w3-padding-32 w3-content w3-text-grey" id="contact" style="margin-bottom:64px">
                <h2>Contact Me</h2>
                <hr class="w3-opacity">

                <div class="w3-section">
                <p><i class="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Chicago, US</p>
                <p><i class="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +00 151515</p>
                <p><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
                </div>
                
                <!-- Image of location/map -->
                <img src="https://www.w3schools.com/w3images/map.jpg" class="w3-image w3-greyscale" style="width:100%;margin:32px 0">
            
                <p>Lets get in touch. Send me a message:</p>
                <form action="/action_page.php" target="_blank">
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Subject" required name="Subject"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message"></p>
                <p>
                    <button class="w3-button w3-light-grey w3-padding-large" type="submit">
                    <i class="fa fa-paper-plane"></i> SEND MESSAGE
                    </button>
                </p>
                </form>
            <!-- End Contact Section -->
            </div>  
            
            <!-- Footer. This section contains an ad for W3Schools Spaces. You can leave it to support us. -->
            <footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style="margin:-24px">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
                <i class="fa fa-instagram w3-hover-opacity"></i>
                <i class="fa fa-snapchat w3-hover-opacity"></i>
                <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                <i class="fa fa-twitter w3-hover-opacity"></i>
                <i class="fa fa-linkedin w3-hover-opacity"></i>
                <p class="w3-small">This website was made with W3schools Spaces. Make your own free website today!</p>
                <a class="w3-button w3-round-xxlarge w3-small w3-dark-grey" href="https://www.w3schools.com/spaces" target="_blank">Start now</a>  
                <!-- End footer -->
            </footer>
            <!-- END PAGE CONTENT -->
            </div>

            <script>
            // Open and close sidebar
            function openNav() {
            document.getElementById("mySidebar").style.width = "60%";
            document.getElementById("mySidebar").style.display = "block";
            }

            function closeNav() {
            document.getElementById("mySidebar").style.display = "none";
            }
            </script>

            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Kiya Fashion",
        value: "fashion",
        description: "A stylish and trendy fashion template, perfect for fashion bloggers and online stores, featuring a chic design and user-friendly layout.",
        image: fashionImage,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>W3.CSS Template</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <style>
                body, h1,h2,h3,h4,h5,h6 {font-family: "Montserrat", sans-serif}
                .w3-row-padding img {margin-bottom: 12px}
                .bgimg {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('https://www.w3schools.com/w3images/profile_girl.jpg');
                min-height: 100%;
                }
                </style>
            </head>
            <body>

            <!-- Sidebar with image -->
            <nav class="w3-sidebar w3-hide-medium w3-hide-small" style="width:40%">
            <div class="bgimg"></div>
            </nav>

            <!-- Hidden Sidebar (reveals when clicked on menu icon)-->
            <nav class="w3-sidebar w3-black w3-animate-right w3-xxlarge" style="display:none;padding-top:150px;right:0;z-index:2" id="mySidebar">
            <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-black w3-xxxlarge w3-display-topright" style="padding:0 12px;">
                <i class="fa fa-remove"></i>
            </a>
            <div class="w3-bar-block w3-center">
                <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Home</a>
                <a href="#portfolio" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Portfolio</a>
                <a href="#about" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">About</a>
                <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-black" onclick="closeNav()">Contact</a>
            </div>
            </nav>

            <!-- Page Content -->
            <div class="w3-main w3-padding-large" style="margin-left:40%">

            <!-- Menu icon to open sidebar -->
            <span class="w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black" style="width:auto;right:0;" onclick="openNav()"><i class="fa fa-bars"></i></span>

            <!-- Header -->
            <header class="w3-container w3-center" style="padding:128px 16px" id="home">
                <h1 class="w3-jumbo"><b>Jane Doe</b></h1>
                <p>Photographer and Web Designer.</p>
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-small w3-round" style="display:block;width:60%;margin:auto;">
                <img src="https://www.w3schools.com/w3images/profile_girl.jpg" class="w3-image w3-hide-large w3-hide-medium w3-round" width="1000" height="1333">
                <button class="w3-button w3-light-grey w3-padding-large w3-margin-top">
                <i class="fa fa-download"></i> Download Resume
                </button>
            </header>

            <!-- Portfolio Section -->
            <div class="w3-padding-32 w3-content" id="portfolio">
                <h2 class="w3-text-grey">My Portfolio</h2>
                <hr class="w3-opacity">

                <!-- Grid for photos -->
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/rocks.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/sailboat.jpg" style="width:100%">
                </div>

                <div class="w3-half">
                    <img src="https://www.w3schools.com/w3images/underwater.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/chef.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/wedding.jpg" style="width:100%">
                    <img src="https://www.w3schools.com/w3images/p6.jpg" style="width:100%">
                </div>
                <!-- End photo grid -->
                </div>
            <!-- End Portfolio Section -->
            </div>

            <!-- About Section -->
            <div class="w3-content w3-justify w3-text-grey w3-padding-32" id="about">
                <h2>About</h2>
                <hr class="w3-opacity">
                <p>Some text about me. Some text about me. I am lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 class="w3-padding-16">My Skills</h3>
                <p class="w3-wide">Photography</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:95%">95%</div>
                </div>
                <p class="w3-wide">Web Design</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:85%">85%</div>
                </div>
                <p class="w3-wide">Photoshop</p>
                <div class="w3-light-grey">
                <div class="w3-container w3-center w3-padding-small w3-dark-grey" style="width:80%">80%</div>
                </div><br>

                <div class="w3-row w3-center w3-dark-grey w3-padding-16 w3-section">
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">14+</span><br>
                    Partners
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">55+</span><br>
                    Projects Done
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">89+</span><br>
                    Happy Clients
                </div>
                <div class="w3-quarter w3-section">
                    <span class="w3-xlarge">150+</span><br>
                    Meetings
                </div>
                </div>

                <button class="w3-button w3-light-grey w3-padding-large w3-section">
                <i class="fa fa-download"></i> Download Resume
                </button>

                <!-- Testimonials -->
                <h3 class="w3-padding-24">My Reputation</h3>
                <img src="https://www.w3schools.com/w3images/avatar_smoke.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chandler Bing.</span> Web Designer.</p>
                <p>Jane Doe is just awesome. I am so happy to have met her!</p><br>
            
                <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Chris Fox.</span> CEO at Mighty Schools.</p>
                <p>Jane Doe saved us from a web disaster.</p><br>
                
                <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:80px">
                <p><span class="w3-large w3-text-black w3-margin-right">Rebecca Flex.</span> CEO at Company.</p>
                <p>No one is better than Jane Doe.</p><br>
                
                <!-- Grid for pricing tables -->
                <h3 class="w3-padding-16">My Price</h3>
                <div class="w3-row-padding" style="margin:0 -16px">
                <div class="w3-half w3-margin-bottom">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-dark-grey w3-xlarge w3-padding-32">Basic</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">5GB Storage</li>
                    <li class="w3-padding-16">Mail Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 10</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>

                <div class="w3-half">
                    <ul class="w3-ul w3-center w3-card w3-hover-shadow">
                    <li class="w3-black w3-xlarge w3-padding-32">Pro</li>
                    <li class="w3-padding-16">Web Design</li>
                    <li class="w3-padding-16">Photography</li>
                    <li class="w3-padding-16">50GB Storage</li>
                    <li class="w3-padding-16">Endless Support</li>
                    <li class="w3-padding-16">
                        <h2>$ 25</h2>
                        <span class="w3-opacity">per month</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-white w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                    </ul>
                </div>
                <!-- End Grid/Pricing tables -->
                </div>
                
            <!-- End About Section -->
            </div>

            <!-- Contact Section -->
            <div class="w3-padding-32 w3-content w3-text-grey" id="contact" style="margin-bottom:64px">
                <h2>Contact Me</h2>
                <hr class="w3-opacity">

                <div class="w3-section">
                <p><i class="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Chicago, US</p>
                <p><i class="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +00 151515</p>
                <p><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
                </div>
                
                <!-- Image of location/map -->
                <img src="https://www.w3schools.com/w3images/map.jpg" class="w3-image w3-greyscale" style="width:100%;margin:32px 0">
            
                <p>Lets get in touch. Send me a message:</p>
                <form action="/action_page.php" target="_blank">
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Subject" required name="Subject"></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message"></p>
                <p>
                    <button class="w3-button w3-light-grey w3-padding-large" type="submit">
                    <i class="fa fa-paper-plane"></i> SEND MESSAGE
                    </button>
                </p>
                </form>
            <!-- End Contact Section -->
            </div>  
            
            <!-- Footer. This section contains an ad for W3Schools Spaces. You can leave it to support us. -->
            <footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style="margin:-24px">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
                <i class="fa fa-instagram w3-hover-opacity"></i>
                <i class="fa fa-snapchat w3-hover-opacity"></i>
                <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                <i class="fa fa-twitter w3-hover-opacity"></i>
                <i class="fa fa-linkedin w3-hover-opacity"></i>
                <p class="w3-small">This website was made with W3schools Spaces. Make your own free website today!</p>
                <a class="w3-button w3-round-xxlarge w3-small w3-dark-grey" href="https://www.w3schools.com/spaces" target="_blank">Start now</a>  
                <!-- End footer -->
            </footer>
            <!-- END PAGE CONTENT -->
            </div>

            <script>
            // Open and close sidebar
            function openNav() {
            document.getElementById("mySidebar").style.width = "60%";
            document.getElementById("mySidebar").style.display = "block";
            }

            function closeNav() {
            document.getElementById("mySidebar").style.display = "none";
            }
            </script>

            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Parallax",
        value: "parallax",
        description: "A visually stunning template that utilizes parallax scrolling effects to create an immersive user experience.",
        image: parallaxImage,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="style.css">
                <title>PersonalTrainer</title>
            </head>
            <body>
                <div>
                    <!-- Navbar -->
                    <div class="w3-top w3-text-white w3-black">
                        <div class="w3-bar  ">
                        <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
                        <a href="#home" class="w3-bar-item w3-button w3-padding-large">HOME</a>
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large w3-hide-small">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large w3-hide-small">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
                        </div>
                    </div>
            
                    <!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
                    <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">CONTACT</a>
                    </div>
                </div>
                <section id="home">
                    <div class="hero">
                    <div class="hero-text">
                    <h1>Move Your Body,<br>
                        Shape Your Future</h1>      
                    </div>
                    
                    </div>
                </section>
                <main>
                <div class="about" id="about">
                    <div>
                    <h2 class="title">
                        Get to Know me
                    </h2>
                    <div class="about-main">
                    <div>

                    </div>
                    <div class="about-text">
                        <h3>I'm Paula <br>Personal Trainer </h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, mollitia ex similique ea sit fuga dolores autem omnis beatae iste voluptatem magni saepe .</p>
                        <div style="margin-top:40px">
                        <span class="w3-text-white social" >
                            <p >Follow Me on Social media</p>
                            <div class="w3-margin-top">
                        <a href="#">  <i class="fa fa-facebook-official w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-instagram w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-snapchat w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-pinterest-p w3-hover-opacity icons" ></i></a>  
                        <a href="#"><i class="fa fa-twitter w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-linkedin w3-hover-opacity icons"></i></a>  
                        </div>
                        </span>
                        </div>
                        
                    </div>

                    </div>
                    </div>

                </div>
                <div class="service" id="service">
                    <h2 class="title"> __Service</h2>

                    <div class="card">
                    <div class="card-list">
                        <div class="card-image">
                            <img src="https://spaces.w3schools.com/images/7kEpUPB8vNk.jpg" alt="Photo by Anastase Maragos | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                            <h4>Weight Lifting</h4>
                            <p>$20/Month</p>
                            <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                            </a>

                        </div>
                    </div>
                    <div class="card-list">
                        <div class="card-image">
                        <img src="https://spaces.w3schools.com/images/rZmCg1_QOYQ.jpg" alt="Photo by Sergio Pedemonte | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                        <h4>Bodybuilding</h4>
                        <p>$10/Month</p>
                        <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>
                        </div>

                    </div>
                    <div class="card-list"><div class="card-image">
                        <img src="https://spaces.w3schools.com/images/0ShTs8iPY28.jpg" alt="Photo by Spencer Davis | Unsplash"
                        />
                    </div>
                    <div class="card-text"> 
                        <h4>Functional Fitness</h4>
                        <p>$40/Month</p>
                        <a href="#join">
                        <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>

                    </div>

                    </div>
                    </div>
                </div>

                <div class="testimony" id="testimony">
                    <h2 class="title"> __ What They say about us</h2>

                    <div class="testimony-main">
                            <div class="testimony-image">
                            <img src="https://spaces.w3schools.com/images/CnEEF5eJemQ.jpg" alt="Photo by Karsten Winegeart | Unsplash"/>
                            </div>
                            <div class="testimony-text">
                            <h3>Trenton L. Embree</h3>
                            <p style="font-style: italic;">
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                            </p>

                            </div>
                    </div>
                    <div class="testimony-main">
                    <div class="testimony-image">
                        <img src="https://spaces.w3schools.com/images/eot-ka5dM7Q.jpg" alt="Photo by Hayley Kim Design | Unsplash"/>
                    </div>
                    <div class="testimony-text">
                        <h3>Amanda E. Uren</h3>
                        <p style="font-style: italic;">
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                        </p>

                    </div>
            </div>
            <div class="testimony-main">
            <div class="testimony-image">
                <img src="https://spaces.w3schools.com/images/U5kQvbQWoG0.jpg" alt="Photo by Scott Webb | Unsplash"/>
            </div>
            <div class="testimony-text">
                <h3>Heather J. Hawker</h3>
                <p style="font-style: italic;">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                </p>

            </div>
            </div>



                </div>
                <div class="contact" id="join">
                    <h2 class="title"> __ Join Us</h2>
                    <div class="contact-main">

                    <div class="contact-form">
                        <form >
                        <div class="name"> 
                            <input  class="input name-list" type="text" placeholder="First Name*">
                            <input  class="input name-list" type="text" placeholder="Last Name*">
                        </div>
                        <input id="email" class="input"  type="text" placeholder="Email*">
                        <textarea  id="email" class="input" minlength="100"  placeholder="Your Message*" required></textarea>
                        <button class="w3-btn w3-red w3-round">Send</button>
                        </form>
                        </div>
            
                    
                    <div class="contact-image">
                        <img src="https://spaces.w3schools.com/images/ZXq7xoo98b0.jpg" alt="Photo by Bruce Mars | Unsplash"/>
            
                    </div>
                    </div>
                </div>
                <div class="contact-address" id="contact">
                    <h2 class="title"> __ GET IN TOUCH</h2>
                    <div class="contact-address-list">
                    <div class="contact-list">
                        <h4>location</h4>
                        <p>7018 Baker St.
                        Englewood, NJ 07631</p>
                        <p>4 Trenton St.
                        Geneva, IL 60134</p>
                        <p>116 N. Maiden St.
                        Hempstead, NY 11550</p>
                    
                    </div>
                    <div class="contact-list">
                        <h4>Opening Hour</h4>
                        <p>Monday- Saturday: 8am -9:30pm</p>
                        <p>Sunday:8am- 9pm</p>
                
                    </div>
                    <div class="contact-list">
                        <h4>Say hello</h4>
                        <p> <i class="fa fa-phone " style="margin-right: 8px;font-size: 20px;"></i> 763-957-6781</p>
                        <p><i class="fa fa-phone" style="margin-right: 8px;font-size: 20px;"></i>706-734-2591</p>
                        <p><i class="fa fa-envelope " style=" margin-right: 5px;font-size: 20px;"></i>Paula1996l@yahoo.com</p>
                        
                    </div>

                    </div>

                </div>

                
                </main>
                <div class="w3-padding w3-center" style="background: #FFF4A3;padding: 10px 0px !important; color:#282A35; ">
                <div style="display: flex; justify-content: center;align-items: center; flex-wrap: wrap;">
                    <p style="margin: 10px !important ">This website was made with w3schools Spaces. Make your own free website today</p>
                    <button class="w3-margin-top w3-btn w3-text-white  w3-round-xxlarge" style=" background-color:#282A35;padding: 8px 25px;  margin:0px  !important">Start now</button>
                </div>
            
                </div>
                <script>
                function myFunction() {
                    var x = document.getElementById("navDemo");
                    if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                    } else { 
                    x.className = x.className.replace(" w3-show", "");
                    }
                }
                </script>
            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Personal Trainer",
        value: "personal_trainer",
        description: "A fitness-focused template designed for personal trainers, featuring a clean layout and motivational design elements.",
        image: personalTrainerImage,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="style.css">
                <title>PersonalTrainer</title>
            </head>
            <body>
                <div>
                    <!-- Navbar -->
                    <div class="w3-top w3-text-white w3-black">
                        <div class="w3-bar  ">
                        <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
                        <a href="#home" class="w3-bar-item w3-button w3-padding-large">HOME</a>
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large w3-hide-small">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large w3-hide-small">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
                        </div>
                    </div>
            
                    <!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
                    <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">CONTACT</a>
                    </div>
                </div>
                <section id="home">
                    <div class="hero">
                    <div class="hero-text">
                    <h1>Move Your Body,<br>
                        Shape Your Future</h1>      
                    </div>
                    
                    </div>
                </section>
                <main>
                <div class="about" id="about">
                    <div>
                    <h2 class="title">
                        Get to Know me
                    </h2>
                    <div class="about-main">
                    <div>

                    </div>
                    <div class="about-text">
                        <h3>I'm Paula <br>Personal Trainer </h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, mollitia ex similique ea sit fuga dolores autem omnis beatae iste voluptatem magni saepe .</p>
                        <div style="margin-top:40px">
                        <span class="w3-text-white social" >
                            <p >Follow Me on Social media</p>
                            <div class="w3-margin-top">
                        <a href="#">  <i class="fa fa-facebook-official w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-instagram w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-snapchat w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-pinterest-p w3-hover-opacity icons" ></i></a>  
                        <a href="#"><i class="fa fa-twitter w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-linkedin w3-hover-opacity icons"></i></a>  
                        </div>
                        </span>
                        </div>
                        
                    </div>

                    </div>
                    </div>

                </div>
                <div class="service" id="service">
                    <h2 class="title"> __Service</h2>

                    <div class="card">
                    <div class="card-list">
                        <div class="card-image">
                            <img src="https://spaces.w3schools.com/images/7kEpUPB8vNk.jpg" alt="Photo by Anastase Maragos | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                            <h4>Weight Lifting</h4>
                            <p>$20/Month</p>
                            <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                            </a>

                        </div>
                    </div>
                    <div class="card-list">
                        <div class="card-image">
                        <img src="https://spaces.w3schools.com/images/rZmCg1_QOYQ.jpg" alt="Photo by Sergio Pedemonte | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                        <h4>Bodybuilding</h4>
                        <p>$10/Month</p>
                        <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>
                        </div>

                    </div>
                    <div class="card-list"><div class="card-image">
                        <img src="https://spaces.w3schools.com/images/0ShTs8iPY28.jpg" alt="Photo by Spencer Davis | Unsplash"
                        />
                    </div>
                    <div class="card-text"> 
                        <h4>Functional Fitness</h4>
                        <p>$40/Month</p>
                        <a href="#join">
                        <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>

                    </div>

                    </div>
                    </div>
                </div>

                <div class="testimony" id="testimony">
                    <h2 class="title"> __ What They say about us</h2>

                    <div class="testimony-main">
                            <div class="testimony-image">
                            <img src="https://spaces.w3schools.com/images/CnEEF5eJemQ.jpg" alt="Photo by Karsten Winegeart | Unsplash"/>
                            </div>
                            <div class="testimony-text">
                            <h3>Trenton L. Embree</h3>
                            <p style="font-style: italic;">
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                            </p>

                            </div>
                    </div>
                    <div class="testimony-main">
                    <div class="testimony-image">
                        <img src="https://spaces.w3schools.com/images/eot-ka5dM7Q.jpg" alt="Photo by Hayley Kim Design | Unsplash"/>
                    </div>
                    <div class="testimony-text">
                        <h3>Amanda E. Uren</h3>
                        <p style="font-style: italic;">
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                        </p>

                    </div>
            </div>
            <div class="testimony-main">
            <div class="testimony-image">
                <img src="https://spaces.w3schools.com/images/U5kQvbQWoG0.jpg" alt="Photo by Scott Webb | Unsplash"/>
            </div>
            <div class="testimony-text">
                <h3>Heather J. Hawker</h3>
                <p style="font-style: italic;">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                </p>

            </div>
            </div>



                </div>
                <div class="contact" id="join">
                    <h2 class="title"> __ Join Us</h2>
                    <div class="contact-main">

                    <div class="contact-form">
                        <form >
                        <div class="name"> 
                            <input  class="input name-list" type="text" placeholder="First Name*">
                            <input  class="input name-list" type="text" placeholder="Last Name*">
                        </div>
                        <input id="email" class="input"  type="text" placeholder="Email*">
                        <textarea  id="email" class="input" minlength="100"  placeholder="Your Message*" required></textarea>
                        <button class="w3-btn w3-red w3-round">Send</button>
                        </form>
                        </div>
            
                    
                    <div class="contact-image">
                        <img src="https://spaces.w3schools.com/images/ZXq7xoo98b0.jpg" alt="Photo by Bruce Mars | Unsplash"/>
            
                    </div>
                    </div>
                </div>
                <div class="contact-address" id="contact">
                    <h2 class="title"> __ GET IN TOUCH</h2>
                    <div class="contact-address-list">
                    <div class="contact-list">
                        <h4>location</h4>
                        <p>7018 Baker St.
                        Englewood, NJ 07631</p>
                        <p>4 Trenton St.
                        Geneva, IL 60134</p>
                        <p>116 N. Maiden St.
                        Hempstead, NY 11550</p>
                    
                    </div>
                    <div class="contact-list">
                        <h4>Opening Hour</h4>
                        <p>Monday- Saturday: 8am -9:30pm</p>
                        <p>Sunday:8am- 9pm</p>
                
                    </div>
                    <div class="contact-list">
                        <h4>Say hello</h4>
                        <p> <i class="fa fa-phone " style="margin-right: 8px;font-size: 20px;"></i> 763-957-6781</p>
                        <p><i class="fa fa-phone" style="margin-right: 8px;font-size: 20px;"></i>706-734-2591</p>
                        <p><i class="fa fa-envelope " style=" margin-right: 5px;font-size: 20px;"></i>Paula1996l@yahoo.com</p>
                        
                    </div>

                    </div>

                </div>

                
                </main>
                <div class="w3-padding w3-center" style="background: #FFF4A3;padding: 10px 0px !important; color:#282A35; ">
                <div style="display: flex; justify-content: center;align-items: center; flex-wrap: wrap;">
                    <p style="margin: 10px !important ">This website was made with w3schools Spaces. Make your own free website today</p>
                    <button class="w3-margin-top w3-btn w3-text-white  w3-round-xxlarge" style=" background-color:#282A35;padding: 8px 25px;  margin:0px  !important">Start now</button>
                </div>
            
                </div>
                <script>
                function myFunction() {
                    var x = document.getElementById("navDemo");
                    if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                    } else { 
                    x.className = x.className.replace(" w3-show", "");
                    }
                }
                </script>
            </body>
            </html>
        `,
        css: "",
        js: ""
    },
    {
        name: "Coming Soon / Waitlist",
        value: "waitlist",
        description: "A simple and effective coming soon template, perfect for building anticipation and collecting email addresses for your upcoming project.",
        image: waitlistImage,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="style.css">
                <title>PersonalTrainer</title>
            </head>
            <body>
                <div>
                    <!-- Navbar -->
                    <div class="w3-top w3-text-white w3-black">
                        <div class="w3-bar  ">
                        <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
                        <a href="#home" class="w3-bar-item w3-button w3-padding-large">HOME</a>
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large w3-hide-small">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large w3-hide-small">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
                        </div>
                    </div>
            
                    <!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
                    <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
                        <a href="#about" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">ABOUT</a>
                        <a href="#service" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">SERVICE</a>
                        <a href="#testimony" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">TESTIMONY</a>
                        <a href="#contact" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">CONTACT</a>
                    </div>
                </div>
                <section id="home">
                    <div class="hero">
                    <div class="hero-text">
                    <h1>Move Your Body,<br>
                        Shape Your Future</h1>      
                    </div>
                    
                    </div>
                </section>
                <main>
                <div class="about" id="about">
                    <div>
                    <h2 class="title">
                        Get to Know me
                    </h2>
                    <div class="about-main">
                    <div>

                    </div>
                    <div class="about-text">
                        <h3>I'm Paula <br>Personal Trainer </h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, mollitia ex similique ea sit fuga dolores autem omnis beatae iste voluptatem magni saepe .</p>
                        <div style="margin-top:40px">
                        <span class="w3-text-white social" >
                            <p >Follow Me on Social media</p>
                            <div class="w3-margin-top">
                        <a href="#">  <i class="fa fa-facebook-official w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-instagram w3-hover-opacity icons" ></i></a> 
                        <a href="#"><i class="fa fa-snapchat w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-pinterest-p w3-hover-opacity icons" ></i></a>  
                        <a href="#"><i class="fa fa-twitter w3-hover-opacity icons"></i></a>  
                        <a href="#"><i class="fa fa-linkedin w3-hover-opacity icons"></i></a>  
                        </div>
                        </span>
                        </div>
                        
                    </div>

                    </div>
                    </div>

                </div>
                <div class="service" id="service">
                    <h2 class="title"> __Service</h2>

                    <div class="card">
                    <div class="card-list">
                        <div class="card-image">
                            <img src="https://spaces.w3schools.com/images/7kEpUPB8vNk.jpg" alt="Photo by Anastase Maragos | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                            <h4>Weight Lifting</h4>
                            <p>$20/Month</p>
                            <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                            </a>

                        </div>
                    </div>
                    <div class="card-list">
                        <div class="card-image">
                        <img src="https://spaces.w3schools.com/images/rZmCg1_QOYQ.jpg" alt="Photo by Sergio Pedemonte | Unsplash"/>
                        </div>
                        <div class="card-text"> 
                        <h4>Bodybuilding</h4>
                        <p>$10/Month</p>
                        <a href="#join">
                            <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>
                        </div>

                    </div>
                    <div class="card-list"><div class="card-image">
                        <img src="https://spaces.w3schools.com/images/0ShTs8iPY28.jpg" alt="Photo by Spencer Davis | Unsplash"
                        />
                    </div>
                    <div class="card-text"> 
                        <h4>Functional Fitness</h4>
                        <p>$40/Month</p>
                        <a href="#join">
                        <button class="w3-btn w3-red w3-margin-top w3-round" style="width:100%">Join</button>
                        </a>

                    </div>

                    </div>
                    </div>
                </div>

                <div class="testimony" id="testimony">
                    <h2 class="title"> __ What They say about us</h2>

                    <div class="testimony-main">
                            <div class="testimony-image">
                            <img src="https://spaces.w3schools.com/images/CnEEF5eJemQ.jpg" alt="Photo by Karsten Winegeart | Unsplash"/>
                            </div>
                            <div class="testimony-text">
                            <h3>Trenton L. Embree</h3>
                            <p style="font-style: italic;">
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                            </p>

                            </div>
                    </div>
                    <div class="testimony-main">
                    <div class="testimony-image">
                        <img src="https://spaces.w3schools.com/images/eot-ka5dM7Q.jpg" alt="Photo by Hayley Kim Design | Unsplash"/>
                    </div>
                    <div class="testimony-text">
                        <h3>Amanda E. Uren</h3>
                        <p style="font-style: italic;">
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                        </p>

                    </div>
            </div>
            <div class="testimony-main">
            <div class="testimony-image">
                <img src="https://spaces.w3schools.com/images/U5kQvbQWoG0.jpg" alt="Photo by Scott Webb | Unsplash"/>
            </div>
            <div class="testimony-text">
                <h3>Heather J. Hawker</h3>
                <p style="font-style: italic;">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni, minus saepe exercitationem quis odio molestiae eveniet fuga suscipit sequi totam accusantium inventore voluptas illum beatae, voluptate quo? Accusantium, maiores."
                </p>

            </div>
            </div>



                </div>
                <div class="contact" id="join">
                    <h2 class="title"> __ Join Us</h2>
                    <div class="contact-main">

                    <div class="contact-form">
                        <form >
                        <div class="name"> 
                            <input  class="input name-list" type="text" placeholder="First Name*">
                            <input  class="input name-list" type="text" placeholder="Last Name*">
                        </div>
                        <input id="email" class="input"  type="text" placeholder="Email*">
                        <textarea  id="email" class="input" minlength="100"  placeholder="Your Message*" required></textarea>
                        <button class="w3-btn w3-red w3-round">Send</button>
                        </form>
                        </div>
            
                    
                    <div class="contact-image">
                        <img src="https://spaces.w3schools.com/images/ZXq7xoo98b0.jpg" alt="Photo by Bruce Mars | Unsplash"/>
            
                    </div>
                    </div>
                </div>
                <div class="contact-address" id="contact">
                    <h2 class="title"> __ GET IN TOUCH</h2>
                    <div class="contact-address-list">
                    <div class="contact-list">
                        <h4>location</h4>
                        <p>7018 Baker St.
                        Englewood, NJ 07631</p>
                        <p>4 Trenton St.
                        Geneva, IL 60134</p>
                        <p>116 N. Maiden St.
                        Hempstead, NY 11550</p>
                    
                    </div>
                    <div class="contact-list">
                        <h4>Opening Hour</h4>
                        <p>Monday- Saturday: 8am -9:30pm</p>
                        <p>Sunday:8am- 9pm</p>
                
                    </div>
                    <div class="contact-list">
                        <h4>Say hello</h4>
                        <p> <i class="fa fa-phone " style="margin-right: 8px;font-size: 20px;"></i> 763-957-6781</p>
                        <p><i class="fa fa-phone" style="margin-right: 8px;font-size: 20px;"></i>706-734-2591</p>
                        <p><i class="fa fa-envelope " style=" margin-right: 5px;font-size: 20px;"></i>Paula1996l@yahoo.com</p>
                        
                    </div>

                    </div>

                </div>

                
                </main>
                <div class="w3-padding w3-center" style="background: #FFF4A3;padding: 10px 0px !important; color:#282A35; ">
                <div style="display: flex; justify-content: center;align-items: center; flex-wrap: wrap;">
                    <p style="margin: 10px !important ">This website was made with w3schools Spaces. Make your own free website today</p>
                    <button class="w3-margin-top w3-btn w3-text-white  w3-round-xxlarge" style=" background-color:#282A35;padding: 8px 25px;  margin:0px  !important">Start now</button>
                </div>
            
                </div>
                <script>
                function myFunction() {
                    var x = document.getElementById("navDemo");
                    if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                    } else { 
                    x.className = x.className.replace(" w3-show", "");
                    }
                }
                </script>
            </body>
            </html>
        `,
        css: "",
        js: ""
    }
];