var gulp = require('gulp');
 var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig.json');

gulp.task('compile', function(){
	console.log("Compiling TS.......");	
	
	var tsResult = tsProject.src() 
        .pipe(typescript(tsProject));

	return tsResult.pipe(gulp.dest('./'));
});