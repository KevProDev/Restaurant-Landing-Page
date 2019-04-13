const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
var exec = require('child_process').exec;

gulp.task('default', ['webpack', 'styles', 'browser-sync'], () => {
	gulp.watch('./assets/scss/**/*', ['styles']);
	gulp.watch('./assets/js/**/*', ['webpack']);
	gulp
		.watch([
			'./dist/**/*',
			'./dist/*',
			'!dist/js/**/.#*js',
			'!dist/css/**/.#*css'
		])
		.on('change', reload);
});

gulp.task('watch-proxy', ['webpack', 'styles', 'browser-sync-proxy'], () => {
	gulp.watch('./assets/scss/**/*', ['styles']);
	gulp.watch('./assets/js/**/*', ['webpack']);
	gulp
		.watch([
			'./dist/**/*',
			'./dist/*',
			'!dist/js/**/.#*js',
			'!dist/css/**/.#*css'
		])
		.on('change', reload);
});

gulp.task('styles', () => {
	gulp
		.src('assets/scss/**/*.scss')
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
		)
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: './dist',
		notify: false,
		open: true //change this to true if you want the broser to open automatically
	});
});

gulp.task('browser-sync-proxy', function() {
	// THIS IS FOR SITUATIONS WHEN YOU HAVE ANOTHER SERVER RUNNING
	browserSync.init({
		proxy: {
			target: 'http://localhost:5000/', // can be [virtual host, sub-directory, localhost with port]
			ws: true // enables websockets
		}
		// serveStatic: ['.', './dist']
	});
});

gulp.task('webpack', cb => {
	exec('npm run dev:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('build', ['styles'], cb => {
	exec('npm run build:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});
