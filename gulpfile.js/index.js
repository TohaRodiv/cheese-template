// @ts-check

const path = require("path");
const gulp = require("gulp");

const {
	dest, watch, task,
} = require("gulp");

const 	browserSync  	= require('browser-sync').create(),
		sass         	= require('gulp-sass'),
		prefixer 		= require('gulp-autoprefixer'),
		cssmin     		= require('gulp-clean-css'),
		terser       	= require('gulp-terser'),
		gcmq 			= require('gulp-group-css-media-queries'),
		plumber 		= require('gulp-plumber'),
		tinypng 		= require("gulp-tinypng-compress"),
		sassImport 		= require('gulp-sass-import'),
		del 			= require("del"),
		include 		= require("gulp-include");


const CONFIG = {
	SRC: {
		SASS: path.join (__dirname, "..", "src", "sass", "**", "*.scss"),
		JS: path.join (__dirname, "..", "src", "js", "**", "*.js"),
		HTML: path.join (__dirname, "..", "src", "*.html"),
		IMAGES: path.join (__dirname, "..", "src", "images", "**", "*")
	},

	DIST: {
		CSS: path.join (__dirname, "..", "build", "css"),
		JS: path.join (__dirname, "..", "build", "js"),
		ROOT: path.join (__dirname, "..", "build"),
		IMAGES: path.join (__dirname, "..", "build", "images"),
	},
};

const TINYPNG_API_KEY = [
	"PHcNW6d75ghmfjfyNb2wMVWwfTNMdXPt" // https://tinify.com/dashboard/api#token/cg4rjNc0dmtbJM9N8pmq1JksVXPM4mzV/cU7lwcnr25HT4fw
][0];

task ("sass", () =>
	gulp.src ([CONFIG.SRC.SASS, "!./src/sass/libs/**/*", "!./src/sass/components/**/*"])
	.pipe (plumber())
	// @ts-ignore
	.pipe (sass ({
		debug: true,
		compatibility: "*",
		level: {
			2: {
				all: true,
			},
		},
	},))
	// @ts-ignore
	.pipe (prefixer ())
	// .pipe (gcmq ())
	// .pipe (cssmin())
	.pipe (dest (CONFIG.DIST.CSS))
	.pipe (browserSync.stream ())
);

task ("js", () => 
	gulp.src ([CONFIG.SRC.JS, "!./src/js/libs/**/*"])
		.pipe (plumber())
		.pipe (include ())
		.pipe (dest (CONFIG.DIST.JS))
		.pipe (browserSync.stream ())
);

task ("html", () =>
	gulp.src (CONFIG.SRC.HTML)
		.pipe (plumber())
		.pipe (dest (CONFIG.DIST.ROOT))
		.pipe (browserSync.stream ())
);

task ("tinypng", () =>
	gulp.src (CONFIG.SRC.IMAGES)
		.pipe (plumber())
		.pipe (tinypng({
			key: TINYPNG_API_KEY,
			sigFile: `./..src/images/.tinypng-sigs`,
			log: true,
			summarize: true,
		}))
		.pipe (dest (CONFIG.DIST.IMAGES))
);

task ("copyimg", () =>
	gulp.src (CONFIG.SRC.IMAGES)
		.pipe (plumber())
		.pipe (dest (CONFIG.DIST.IMAGES))
);

task ("clean", () => 
		del ("./build")
);

task ("copy-fonts", () => 
		gulp.src ("./src/fonts/**/*")
		.pipe (plumber())
		.pipe (dest (path.join (CONFIG.DIST.ROOT, "fonts")))
);

task ("copy-css-libs", () => 
		gulp.src ("./src/sass/libs/**/*")
		.pipe (plumber())
		.pipe (dest (path.join (CONFIG.DIST.ROOT, "css", "libs")))
		.pipe (browserSync.stream ())
);

task ("copy-js-libs", () => 
		gulp.src ("./src/js/libs/**/*")
		.pipe (plumber())
		.pipe (dest (path.join (CONFIG.DIST.ROOT, "js", "libs")))
		.pipe (browserSync.stream ())
);

task ("build", gulp.series ("html", "js", "sass", "copy-fonts", "copy-css-libs", "copy-js-libs", "copyimg"));

task ("watch", (done) => {

	browserSync.init({
        server: CONFIG.DIST.ROOT,
    });

	watch ("./src/sass/**/*.scss", gulp.series ("sass"));
	watch ("./src/js/**/*.js", gulp.series ("js"));
	watch ("./src/*.html", gulp.series ("html"));
	watch ("./src/images/**/*", gulp.series ("copyimg"));
	watch ("./src/fonts/**/*", gulp.series ("copy-fonts"));
	watch ("./src/sass/libs/**/*", gulp.series ("copy-css-libs"));
	watch ("./src/js/libs/**/*", gulp.series ("copy-js-libs"));	
	done ();
});


exports.dev = gulp.series(["clean", "build", "watch"]);