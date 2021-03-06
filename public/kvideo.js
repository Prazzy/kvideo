define(function(require) {
  require('plugins/kvideo/kvideo.css');
  require('angular');  
  require('ng-video/dist/ng-video');

  var module = require('ui/modules').get('kvideo',['ngVideo']);
  
  module.controller('VideoCtrl', ['$scope', 'video', function($scope, video) {     
    $scope.playlistOpen = false;
    $scope.videos = {
            first:  'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
            second: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4'
        };
    $scope.playVideo = function playVideo(sourceUrl) {
            video.addSource('mp4', sourceUrl, true);
        };        
    $scope.getVideoName = function getVideoName(videoModel) {
            switch (videoModel.src) {
                case ($scope.videos.first): return "Big Buck Bunny";
                case ($scope.videos.second): return "The Bear";
                default: return "Unknown Video";
            }
        };
    video.addSource('mp4', $scope.videos.first);
    video.addSource('mp4', $scope.videos.second);
 }]);  
  function VideoProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    return new TemplateVisType({
      name: 'trVideo',
      title: 'Video',
      icon: 'fa-camera-retro',
      description: 'Display random video on kibana dashboard',
      requiresSearch: false,
      template: require('plugins/kvideo/kvideo.html')            
    });
  }  
  require('ui/registry/vis_types').register(VideoProvider);  
  return VideoProvider;
});
