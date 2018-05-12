//<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=jcHchhQB8hktfnkasbGFHZBaTpjNbME3"></script>
document.write("<script language=javascript src='http://api.map.baidu.com/api?v=2.0&ak=jcHchhQB8hktfnkasbGFHZBaTpjNbME3'></script>");
var thisURL=document.URL;
var latitudeAll=thisURL.split("?")[1];
var latitude=latitudeAll.split("=")[1];
var longitudeAll=thisURL.split("?")[2];
var longitude=longitudeAll.split("=")[1];
document.getElementById("jingdu").innerHTML="经度="+latitude+"  纬度="+longitude;

      // 百度地图API功能
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(longitude, latitude);//34.7534880000,113.6313490000
      map.centerAndZoom(point, 12);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      //把地址在地图上标出来
      var geoc = new BMap.Geocoder();
      geoc.getLocation(point, function(rs){
        var addrmsg=rs.address;
        //var addComp = rs.addressComponents;  //详细的分省市县街道的信息
        //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);

        var opts = {
          width : 200,     // 信息窗口宽度
          height: 50,     // 信息窗口高度
        }
        var infoWindow = new BMap.InfoWindow("地址:"+addrmsg, opts);  //创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口


      });