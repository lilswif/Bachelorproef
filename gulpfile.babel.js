import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import gulp from 'gulp';
import gutil from 'gulp-util';
import nodemon from 'nodemon';
import path from 'path';
import backendConfig from './config/webpack.backend.config.js';
import frontendConfig from './config/webpack.frontend.config.js';

const FRONTEND_PORT = 8080;
const BACKEND_PORT = 9090;

function onBuild(err, stats) {
  if (err) {
    throw new Error(err);
  }
  console.log(stats.toString());
}

// Default: list all tasks.
gulp.task('default', (done) => {
  console.log(`Available commands: dev, build`);
});

// Start frontend
gulp.task('frontend', (done) => {
  webpack(frontendConfig).run((err, stats) => {
    onBuild(err, stats);
    done();
  });
});

// Start frontend watch
gulp.task('frontend-watch', (done) => {
  const webpackDevserver = new WebpackDevServer(webpack(frontendConfig), {
      publicPath: frontendConfig.output.publicPath,
      stats: { colors: true },
      historyApiFallback: true,
      proxy: {
        "*": "http://localhost:9090"
      }
    })

  webpackDevserver.listen(FRONTEND_PORT, 'localhost', (err, result) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(`Webpack-dev-server listening at localhost:${FRONTEND_PORT} Open your browser on http://localhost:${FRONTEND_PORT}.`);
      }
    });
})

// Start backend
gulp.task('backend', (done) => {
  webpack(backendConfig).run((err, stats) => {
    onBuild(err, stats);
    done();
  });
});

// Start backend watch
gulp.task('backend-watch', (done) => {
  gutil.log('Backend warming up...');
  var firedDone = false;

  webpack(backendConfig).watch(100, (err, stats) => {
    if(!firedDone) { done(); firedDone = true; }
    onBuild(err, stats);
   
    nodemon.restart();
  });
});

// 
// gulp.task('run', ['set-dev-env', 'backend-watch'], () => {
//   nodemon({
//     execMap: {
//       js: 'node'
//     },
//     script: path.join(__dirname, 'build/backend'),
//     ignore: ['*'],
//     watch: ['foo/'],
//     ext: 'noop'
//   }).on('restart', () => {
//     console.log('Patched!');
//   });
// });

// Set NODE_ENV to development
gulp.task('set-dev-env', () => {
  console.log(`NODE_ENV will be set to development...`);
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to production
gulp.task('set-prod-env', () => {
  console.log(`NODE_ENV will be set to production...`);
  process.env.NODE_ENV = 'production';
});

// Start server
gulp.task('server', () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/backend'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', () => {
    console.log('Server restarted!');
  });
})

// Generate docs
gulp.task('docs', () => {

});

// Build project
gulp.task('build', ['set-prod-env', 'build-js']);

// Build backend & frontend
gulp.task('build-js', ['backend', 'frontend']);

// Watch backend & frontend
gulp.task('watch', ['backend-watch', 'frontend-watch']);

// Start development session
gulp.task('dev', ['set-dev-env', 'backend-watch', 'frontend-watch', 'server']);
