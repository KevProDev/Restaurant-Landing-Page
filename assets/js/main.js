import Jquery from '../../node_modules/jquery/dist/jquery';
console.log('I AM WORKING');

const $ = Jquery;

$('.menu').on('click', function() {
	$(this).toggleClass('active');
	$('.overlay').toggleClass('menu-open');
});

$('.nav a').on('click', function() {
	$('.menu').removeClass('active');
	$('.overlay').removeClass('menu-open');
});
