var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var concat = require("gulp-concat");


gulp.task("clean", function() {
    return del.sync("build");
});

gulp.task("html", function()  {
   return gulp.src("*.html")
        .pipe(gulp.dest("build"));
});

gulp.task('style',  function() {
    return gulp.src('less/app.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat("css/style.css"))
        .pipe(gulp.dest('build'));
});

gulp.task("copy", function() {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**/*.{jpg,png,svg,webp}",
        "js/**/*.js"
    ], {
        base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("default", ["clean","html","style","copy"]);
