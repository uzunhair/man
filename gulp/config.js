var cmsPath = 'W:/domains/man/templates/template_zm_it/';
module.exports = {
    path: {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'dist/',
            pug: 'dist/',
            //js: 'dist/js/',
            //style: 'dist/css/',
            //img: 'dist/img/',
            //svgIcon: 'src/img/svg/',
            //fonts: 'dist/fonts/',
            style: cmsPath + '/css',
            img: cmsPath + '/images',
            js: cmsPath + '/js',
            fonts: cmsPath + '/fonts',
            svgIcon: cmsPath + '/images/svg'
        },
        src: { //Пути откуда брать исходники
            html: 'src/html/*.html',
            pug: 'src/pug/*.pug',
            jsSeparate: ['src/js/separate/*.js',], // статичные js файлы
            jsConcat: [
                'node_modules/popper.js/dist/umd/popper.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.js',
                'node_modules/enquire.js/dist/enquire.min.js',
                'node_modules/picturefill/dist/picturefill.min.js',
                'node_modules/slick-carousel/slick/slick.min.js',
                'src/js/concat/*.js',
                'src/js/setting.js'],
            styleTheme: 'src/sass/theme.scss',
            img: ['src/img/**/*.+(png|jpg|jpeg|gif|svg)', '!src/img/svg*/**'],
            svgIcon: 'src/img/svg-icon/*.svg',
            fonts: 'src/fonts/**/*.*'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            html: 'src/**/*.html',
            pug: 'src/pug/**/*.*',
            js: 'src/js/**/*.js',
            styleTheme: ['src/sass/**/*.scss'],
            img: ['src/img/**/*.+(png|jpg|jpeg|gif|svg)', '!src/img/svg*/**'],
            svgIcon: 'src/img/svg-icon/*.svg',
            fonts: 'src/fonts/**/*.*'
        },
        browser: {
            html: 'dist/**/*.html',
            pug: 'dist/**/*.pug',
            js: 'dist/js/**/*.js',
            style: 'dist/css/**/*.*',
            img: ['src/img/**/*.+(png|jpg|jpeg|gif|svg)', '!src/img/svg*/**'],
            svgIcon: 'src/img/svg-icon/*.svg',
            fonts: 'dist/fonts/**/*.*'
        },
        clean: {
            html: 'dist/*.html',
            js: 'dist/js/',
            style: 'dist/css/',
            img: 'dist/img/',
            svg: 'src/sass/sprite/_sprite.scss',
            fonts: 'dist/fonts/'
        }
    }
};