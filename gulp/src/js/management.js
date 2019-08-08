

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

layui.use(['layer', 'jquery', "form", 'laypage', 'laydate'], function () {
  var layer = layui.layer;
  var $ = layui.$;
  var _form = layui.form;
  var laypage = layui.laypage;
  var laydate = layui.laydate;
  var user = {
    token: $.session.get('Cashier_Token') ? $.session.get('Cashier_Token') : null,
    information: $.session.get("Cashier_User") ? $.session.get("Cashier_User") : null,
    PaymentConfig: $.session.get("Cashier_User").SysArguments.PaymentConfig //选项卡切换

  };
  $(".lomoTab span").on("click", function () {
    $(this).addClass("hover").siblings().removeClass("hover");
    var index = $(this).index();
    $(".lomoTab-warp").eq(index).show().siblings(".lomoTab-warp").hide();
  });

  var Bill =
  /*#__PURE__*/
  function () {
    function Bill() {
      _classCallCheck(this, Bill);

      this.list = [];
    }

    _createClass(Bill, [{
      key: "start",
      value: function start(data) {
        this.type = data.type;
        this.name = data.name;
        this.url = data.url;
        this.search(this.name, this.url, this.type);
        this.form(this.name);
        this.election(this.name);
        this.details(this.name, this.url, this.type);
      } //计算选择日期

    }, {
      key: "_time",
      value: function _time(i) {
        var endTime = cashier.curentTime(new Date());
        endTime = cashier.revDateFormat(endTime);

        switch (i) {
          case 0:
            var startTime = cashier.curentTime(new Date(new Date().toLocaleDateString()));
            startTime = cashier.revDateFormat(startTime);
            return [startTime, endTime];

          case 1:
            var date = new Date(new Date() - 1000 * 60 * 60 * 24 * 7);
            date.setHours(0);
            date.setSeconds(0);
            date.setMinutes(0);
            var startTime = cashier.curentTime(date);
            startTime = cashier.revDateFormat(startTime);
            return [startTime, endTime];

          case 2:
            var date = new Date();
            date.setDate(1);
            date.setHours(0);
            date.setSeconds(0);
            date.setMinutes(0);
            var startTime = cashier.curentTime(date);
            startTime = cashier.revDateFormat(startTime);
            return [startTime, endTime];

          case 3:
            var date = new Date(new Date() - 1000 * 60 * 60 * 24 * 30);
            date.setHours(0);
            date.setSeconds(0);
            date.setMinutes(0);
            var startTime = cashier.curentTime(date);
            startTime = cashier.revDateFormat(startTime);
            return [startTime, endTime];

          case 4:
            var g = 0;
            $(".lomoTab span").each(function () {
              if ($(this).hasClass("hover")) {
                g = $(this).index();
              }
            });
            time1 = cashier.revDateFormat($(".lomoTab-warp").eq(g).find('.time-start').val());
            time2 = cashier.revDateFormat($(".lomoTab-warp").eq(g).find('.time-end').val());
            return [time1, time2];
        }
      }
    }, {
      key: "getMaxTime",
      //选择日期最大
      value: function getMaxTime(dtTime, numDay) {
        var date = new Date(dtTime);
        var lIntval = parseInt(numDay);

        if (!isNaN(lIntval) && lIntval !== 0) {
          date.setDate(date.getDate() + lIntval);
        }

        var year = date.getYear();
        var month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }

        var day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }

        var dates = (year < 1900 ? 1900 + year : year) + '-' + month + '-' + day + ' 23:59:59'; //日期最大限制

        return dates;
      }
    }, {
      key: "getMinTime",
      //选择日期最小
      value: function getMinTime(dtTime, numDay) {
        var date = new Date(dtTime);
        var lIntval = parseInt(numDay);

        if (!isNaN(lIntval) && lIntval !== 0) {
          date.setDate(date.getDate() + lIntval);
        }

        var year = date.getYear();
        var month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }

        var day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }

        var dates = (year < 1900 ? 1900 + year : year) + '-' + month + '-' + day + ' 00:00:00';
        return dates;
      }
    }, {
      key: "payType",
      //获取需要展示的支付方式
      value: function payType(type, entry) {
        if (!entry.length > 0) {
          return false;
        }

        ;

        if (type == 0 || type == 2) {
          var list = [];

          for (var key in entry) {
            if (entry[key].code != '003' && entry[key].code != '010' && entry[key].code != '020') {
              list.push(entry[key]);
            }

            ;
          }

          ;
          return list;
        } else if (type == 1) {
          var list = [];

          for (var key in entry) {
            if (entry[key].code != '003' && entry[key].code != '010' && entry[key].code != '020' && entry[key].code != '002') {
              list.push(entry[key]);
            }

            ;
          }

          ;
          return list;
        } else {
          return [];
        }
      }
    }, {
      key: "PaymentType",
      //拼接支付方式
      value: function PaymentType(data) {
        var html = '';

        for (var i = 0; i < data.length; i++) {
          html += "<option value=\"".concat(data[i].code, "\">").concat(data[i].name, "</option>");
        }

        ;
        return html;
      }
    }, {
      key: "form",
      //layui初始化
      value: function form(name) {
        var that = this;

        _form.render();

        var nowtime = new Date();
        var startTime = that.getMinTime(nowtime, -30);
        var endTime = that.getMaxTime(nowtime);
        var minTime = laydate.render({
          type: "datetime",
          elem: '#' + name + 'TimeStart',
          theme: '#41c060',
          max: endTime,
          value: startTime,
          btns: ['now', 'confirm'],
          done: function done(value, date, endDate) {
            maxTime.config.min = date;
            maxTime.config.min.month = date.month - 1;
          }
        });
        var maxTime = laydate.render({
          type: "datetime",
          min: startTime,
          max: endTime,
          value: endTime,
          elem: '#' + name + 'TimeEnd',
          theme: '#41c060',
          btns: ['now', 'confirm'],
          done: function done(value, date, endDate) {
            minTime.max = date;
            minTime.config.max.month = date.month - 1;
          }
        });

        _form.verify({
          onlynum: function onlynum(value, item) {
            if (value != "") {
              if (!verify.money[0].test(value)) return '输入错误';
            }
          }
        });
      }
    }, {
      key: "search",
      //获取单据列表
      value: function search(name, url, type) {
        var that = this;

        _form.on('submit(' + name + 'Req)', function (data) {
          var i = 0;
          $('#' + name + ' .online-order-time li').each(function () {
            if ($(this).hasClass('hover')) {
              i = $(this).index();
            }
          });

          var time = that._time(i);

          var Filter = {
            BTime: time[0],
            ETime: time[1],
            BillCode: data.field.cardId ? data.field.cardId : "",
            CardID: data.field.id ? data.field.id : "",
            TotalMoney_Start: data.field.minimum ? data.field.minimum : '',
            TotalMoney_End: data.field.highest ? data.field.highest : '',
            Remark: data.field.remarks ? data.field.remarks : "",
            RevokeState: data.field.type ? data.field.type : 0
          };
          var param = {
            Page: 1,
            Rows: 20,
            Filter: JSON.stringify(Filter)
          };

          if (type == 0) {} else if (type == 1) {
            var queryList = function queryList(data) {
              var html = "";

              for (var i = 0; i < data.list.length; i++) {
                html += "<tr>\n                       <td>".concat(data.list[i].BillCode, "</td>\n                       <td>").concat(cashier.dateFormat(data.list[i].CreateTime), "</td>\n                       <td>").concat(data.list[i].CardID, "</td>\n                       <td>").concat(data.list[i].CardName, "</td>\n                       <td>").concat(data.list[i].RealMoney, "</td>\n                       <td>").concat(data.list[i].UserName, "</td>\n                       <td>").concat(data.list[i].ShopName, "</td>\n                       <td>").concat(data.list[i].Remark, "</td>\n                       <td><button type=\"button\" class=\"add-bt online-order-bt bt-xq\">\u8BE6\u60C5</button><button type=\"button\"\n                           class=\"add-bt online-order-bt bt-cdy\">\u91CD\u6253\u5370</button>\n                       </td>\n                     </tr>");
              }

              ;
              return html;
            };
          } else if (type == 2) {
            var queryList = function queryList(data) {
              var html = "";

              for (var i = 0; i < data.list.length; i++) {
                html += "<tr>\n                           <td>".concat(data.list[i].BillCode, "</td>\n                           <td>").concat(cashier.dateFormat(data.list[i].CreateTime), "</td>\n                           <td>").concat(data.list[i].CardID, "</td>\n                           <td>").concat(data.list[i].CardName, "</td>\n                           <td>").concat(data.list[i].DiscountMoney, "</td>\n                           <td>").concat(data.list[i].TotalCount, "</td>\n                           <td>").concat(data.list[i].UserName, "</td>\n                           <td>").concat(data.list[i].ShopName, "</td>\n                           <td>").concat(data.list[i].Remark, "</td>\n                           <td><button type=\"button\" class=\"add-bt online-order-bt bt-xq\">\u8BE6\u60C5</button><button type=\"button\"\n                               class=\"add-bt online-order-bt bt-cdy\">\u91CD\u6253\u5370</button>\n                           </td>\n                         </tr>");
              }

              ;
              return html;
            };
          } else if (type == 3) {
            var queryList = function queryList(data) {
              var html = "";

              for (var i = 0; i < data.list.length; i++) {
                html += "<tr>\n                           <td>".concat(data.list[i].BillCode, "</td>\n                           <td>").concat(cashier.dateFormat(data.list[i].CreateTime), "</td>\n                           <td>").concat(data.list[i].CardID, "</td>\n                           <td>").concat(data.list[i].CardName, "</td>\n                           <td>").concat(data.list[i].TotalMoney, "\u79EF\u5206</td>\n                           <td>").concat(data.list[i].TotalNum, "</td>\n                           <td>").concat(data.list[i].UserName, "</td>\n                           <td>").concat(data.list[i].ShopName, "</td>\n                           <td>").concat(data.list[i].Remark, "</td>\n                           <td><button type=\"button\" class=\"add-bt online-order-bt bt-xq\">\u8BE6\u60C5</button><button type=\"button\"\n                               class=\"add-bt online-order-bt bt-cdy\">\u91CD\u6253\u5370</button>\n                           </td>\n                         </tr>");
              }

              ;
              return html;
            };
          }

          ;
          $.http.post(url.query, param, user.token, function (res) {
            layer.msg(res.msg);

            if (res.status == 1) {
              if (res.data.list.length > 0) {
                that.list = res.data.list;
                $("#" + name + " tbody").html(queryList(res.data));
                laypage.render({
                  elem: name + 'Page',
                  //容器名称
                  limit: 7,
                  //每页条数
                  count: res.data.total,
                  //总页数
                  theme: "#41c060",
                  //颜色
                  jump: function jump(obj, first) {
                    if (!first) {
                      var _param = {
                        Page: obj.curr,
                        Rows: 7,
                        Filter: JSON.stringify(Filter)
                      };
                      $.http.post(LuckVipsoft.api.GetRechargeCountOrderByPaged, _param, user.token, function (resquest) {
                        that.list = res.data.list;
                        $("#" + name + " tbody").html(queryList(resquest.data));
                      });
                    }
                  }
                });
              } else {
                layer.msg('没有符合条件的单据');
              }
            }
          });
          return false;
        });
      }
    }, {
      key: "details",
      //单据列表详细
      value: function details(name, url, type) {
        var that = this;
        $("#" + name).on("click", ".bt-xq", function () {
          $(this).blur();
          var orderId = $(this).index("#" + name + " .bt-xq");
          var param = {
            OrderID: that.list[orderId].Id
          };
          $.http.post(url.details, param, user.token, function (res) {
            layer.msg(res.msg);

            if (res.status == 1) {
              if (type == 0) {} else if (type == 1) {
                var details = res.data;
                var html = "<div class=\"lomo-gd order-cd cd-info\" style=\"margin: 0;width: 100%;height: 100%;\">\n                        <div class=\"order-cd-info\">\n                          <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"order-cdTable\"\n                            style=\"background: #F2F2F2;\">\n                            <tr>\n                              <td width=\"49%\"><i>\u8BA2\u5355\u65E5\u671F\uFF1A</i><em>".concat(cashier.dateFormat(details.CreateTime), "</em></td>\n                              <td></td>\n                            </tr>\n                            <tr>\n                              <td width=\"49%\"><i>\u5355\u636E\u7F16\u53F7\uFF1A</i><em>").concat(details.BillCode, "</em></td>\n                              <td></td>\n                            </tr>\n                            <tr>\n                              <td><i>\u4F1A\u5458\u5361\u53F7\uFF1A</i><em>").concat(details.CardID, "</em></td>\n                              <td><i>\u4F1A\u5458\u59D3\u540D\uFF1A</i><em>").concat(details.CardName, "</em></td>\n                            </tr>\n                            <tr>\n                              <td><i>\u4F1A\u5458\u7B49\u7EA7\uFF1A</i><em>").concat(details.LevelName, "</em></td>\n                              <td><i>\u6240\u5C5E\u95E8\u5E97\uFF1A</i><em>").concat(details.ShopName, "</em></td>\n                            </tr>\n                            <tr>\n                              <td><i>\u8BA2\u5355\u5907\u6CE8\uFF1A</i><em>").concat(details.Remark, "</em></td>\n                              <td></td>\n                            </tr>\n                            <tr>\n                              <td><i>\u64A4\u5355\u4EBA\uFF1A</i><em>").concat(details.RevokeUid ? details.RevokeUid : "", "</em></td>\n                              <td><i>\u64A4\u5355\u65F6\u95F4\uFF1A</i><em>").concat(details.RevokeTime ? cashier.dateFormat(details.RevokeTime) : "", "</em></td>\n                            </tr>\n                            <tr>\n                              <td><i>\u64A4\u5355\u5907\u6CE8\uFF1A</i><em>").concat(details.RevokeRemark ? details.RevokeRemark : "", "</em></td>\n                              <td></td>\n                            </tr>\n                          </table>\n                          <div class=\"lomo-xq-czxq\">\n                            <div><span>\u5B9E\u4ED8\u91D1\u989D\uFF1A</span><span class=\"bold size-red\">\uFFE5").concat(details.TotalMoney, "</span></div>\n                            <div> <span>\u4F18\u60E0\u6D3B\u52A8\uFF1A</span><span class=\"bold\">").concat(details.ActivityGiveMoney ? details.ActivityGiveMoney : "", "</span></div>\n                            <div><span>\u5B9E\u9645\u5230\u8D26\uFF1A</span><span class=\"bold size-red\">\uFFE5").concat(details.RealMoney, "</span></div>\n                            <div>\n                              <span>\u73B0\u4EF7\u652F\u4ED8\uFF1A</span><span class=\"bold\"></span>\n                              <span style=\"margin-left:40px;\">\u5FAE\u4FE1\u652F\u4ED8\uFF1A</span><span class=\"bold\"></span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>");
              } else if (type == 2) {
                var details = res.data.Details;
                var order = res.data.Order;

                var _detailed = function _detailed(data) {
                  var _html = '';

                  for (var i = 0; i < data.length; i++) {
                    if (data[i].IsCombo == 0) {
                      _html += "<tr><td>\u666E\u901A\u4EA7\u54C1</td>";
                    } else {
                      _html += "<tr><td>\u5957\u9910</td>";
                    }

                    _html += "<td>".concat(data[i].GoodsCode, "</td>\n                                      <td>").concat(data[i].GoodsName, "</td>\n                                      <td>\uFFE5").concat(data[i].DiscountPrice, "</td>\n                                      <td>").concat(data[i].Number, "</td>\n                                      <td>\uFFE5").concat(data[i].TotalMoney, "</td>\n                                    </tr>");
                  }

                  return _html;
                };

                var html = "<div class=\"lomo-gd order-cd cd-info\"  style=\"margin: 0;width: 100%;height: 100%;\"><div class=\"order-cd-info\">\n                              <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"order-cdTable\"style=\"background: #F2F2F2;\">\n                                <tr>\n                                  <td width=\"49%\"><i>\u8BA2\u5355\u65E5\u671F\uFF1A</i><em>".concat(cashier.dateFormat(order.CreateTime), "</em></td>\n                                  <td><i>\u83B7\u5F97\u79EF\u5206\uFF1A</i><em>").concat(order.TotalPoint, "</em></td>\n                                </tr>\n                                <tr><td width=\"49%\"><i>\u5355\u636E\u7F16\u53F7\uFF1A</i><em>").concat(order.BillCode, "</em></td><td></td></tr>\n                                <tr><td><i>\u4F1A\u5458\u5361\u53F7\uFF1A</i><em>").concat(order.CardID, "</em></td>\n                                <td><i>\u4F1A\u5458\u59D3\u540D\uFF1A</i><em>").concat(order.CardName, "</em></td></tr>\n                                <tr> <td><i>\u4F1A\u5458\u7B49\u7EA7\uFF1A</i><em>").concat(order.LevelName, "</em></td>\n                                <td><i>\u6240\u5C5E\u95E8\u5E97\uFF1A</i><em>").concat(order.ShopName, "</em></td></tr>\n                                <tr><td><i>\u8BA2\u5355\u5907\u6CE8\uFF1A</i><em>").concat(order.Remark, "</em></td><td></td></tr>\n                                <tr><td><i>\u64A4\u5355\u4EBA\uFF1A</i><em>").concat(order.RevokeUid ? order.RevokeUid : "", "</em></td>\n                                <td><i>\u64A4\u5355\u65F6\u95F4\uFF1A</i><em>").concat(order.RevokeTime ? cashier.dateFormat(order.RevokeTime) : "", "</em></td></tr>\n                                <tr><td><i>\u64A4\u5355\u5907\u6CE8\uFF1A</i><em>").concat(order.RevokeRemark ? order.RevokeRemark : "", "</em></td><td></td></tr>\n                              </table>\n                              <div class=\"lomo-xq-ksxf\">\n                                <div><span>\u5B9E\u4ED8\u91D1\u989D\uFF1A</span><span class=\"bold size-red\">\uFFE5").concat(order.DiscountMoney, "</span></div>\n                                <div><span>\u73B0\u91D1\u652F\u4ED8\uFF1A</span><span class=\"bold\">\uFFE5464</span>\n                                <span style=\"margin-left:40px;\">\u5FAE\u4FE1\u652F\u4ED8\uFF1A</span><span class=\"bold\">\uFFE5654</span></div></div>\n                              <div class=\"order-cdTable2Sco\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"order-cdTable2\"style=\"margin-top:20px;\">\n                                <tr><th>\u5546\u54C1\u7C7B\u578B</th><th>\u5546\u54C1\u7F16\u53F7</th><th>\u5546\u54C1\u540D\u79F0</th><th>\u6298\u540E\u5355\u4EF7</th><th>\u5546\u54C1\u6570\u91CF</th><th>\u603B\u91D1\u989D</th> </tr>\n                                 <tbody>").concat(_detailed(details), "</tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>");
              } else if (type == 3) {
                var details = res.data.Details;
                var order = res.data.Order;

                var _detailed = function _detailed(data) {
                  var _html = '';

                  for (var i = 0; i < data.length; i++) {
                    if (data[i].GoodsType == 1) {
                      _html += "<tr><td>\u666E\u901A\u4EA7\u54C1</td>";
                    } else if (data[i].GoodsType == 2) {
                      _html += "<tr><td>\u670D\u52A1\u4EA7\u54C1</td>";
                    }

                    _html += "<td>".concat(data[i].GoodsCode, "</td>\n                                      <td>").concat(data[i].GoodsName, "</td>\n                                      <td>").concat(data[i].DiscountPrice, "\u79EF\u5206</td>\n                                      <td>").concat(data[i].Number, "</td>\n                                      <td>").concat(data[i].TotalMoney, "\u79EF\u5206</td>\n                                    </tr>");
                  }

                  return _html;
                };

                var html = "<div class=\"lomo-gd order-cd cd-info\"  style=\"margin: 0;width: 100%;height: 100%;\">\n                            <div class=\"order-cd-info\">\n                              <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"order-cdTable\"\n                                style=\"background: #F2F2F2;\">\n                                <tr>\n                                  <td width=\"49%\"><i>\u8BA2\u5355\u65E5\u671F\uFF1A</i><em>".concat(cashier.dateFormat(order.CreateTime), "</em></td>\n                                  <td><i>\u83B7\u5F97\u79EF\u5206\uFF1A</i><em>").concat(order.TotalPoint, "</em></td>\n                                </tr>\n                                <tr>\n                                  <td width=\"49%\"><i>\u5355\u636E\u7F16\u53F7\uFF1A</i><em>").concat(order.BillCode, "</em></td>\n                                  <td></td>\n                                </tr>\n                                <tr>\n                                  <td><i>\u4F1A\u5458\u5361\u53F7\uFF1A</i><em>").concat(order.CardID, "</em></td>\n                                  <td><i>\u4F1A\u5458\u59D3\u540D\uFF1A</i><em>").concat(order.CardName, "</em></td>\n                                </tr>\n                                <tr>\n                                  <td><i>\u4F1A\u5458\u7B49\u7EA7\uFF1A</i><em>").concat(order.LevelName, "</em></td>\n                                  <td><i>\u6240\u5C5E\u95E8\u5E97\uFF1A</i><em>").concat(order.ShopName, "</em></td>\n                                </tr>\n                                <tr>\n                                  <td><i>\u8BA2\u5355\u5907\u6CE8\uFF1A</i><em>").concat(order.Remark, "</em></td>\n                                  <td></td>\n                                </tr>\n                                <tr>\n                                  <td><i>\u64A4\u5355\u4EBA\uFF1A</i><em>").concat(order.RevokeUid ? order.RevokeUid : "", "</em></td>\n                                  <td><i>\u64A4\u5355\u65F6\u95F4\uFF1A</i><em>").concat(order.RevokeTime ? cashier.dateFormat(order.RevokeTime) : "", "</em></td>\n                                </tr>\n                                <tr>\n                                  <td><i>\u64A4\u5355\u5907\u6CE8\uFF1A</i><em>").concat(order.RevokeRemark ? order.RevokeRemark : "", "</em></td>\n                                  <td></td>\n                                </tr>\n                              </table>\n                              <div class=\"lomo-xq-ksxf\">\n                                <div><span>\u5B9E\u4ED8\u79EF\u5206\uFF1A</span><span class=\"bold size-red\">\uFFE5").concat(order.TotalMoney, "</span></div>\n                                <div>\n                                <span>\u79EF\u5206\u652F\u4ED8\uFF1A</span><span class=\"bold size-red\">\uFFE5").concat(order.TotalMoney, "</span>\n                                </div>\n                              </div>\n                              <div class=\"order-cdTable2Sco\">\n                                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"order-cdTable2\"\n                                  style=\"margin-top:20px;\">\n                                  <tr>\n                                    <th>\u5546\u54C1\u7C7B\u578B</th>\n                                    <th>\u5546\u54C1\u7F16\u53F7</th>\n                                    <th>\u5546\u54C1\u540D\u79F0</th>\n                                    <th>\u6298\u540E\u5355\u4EF7</th>\n                                    <th>\u5151\u6362\u6570\u91CF</th>\n                                    <th>\u603B\u79EF\u5206</th>\n                                  </tr>\n                                 <tbody>\n                                 ").concat(_detailed(details), "\n                                 </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>");
              }

              layer.open({
                type: 1,
                title: '单据详情',
                closeBtn: 1,
                shadeClose: false,
                shade: 0.3,
                btn: ['整单撤单', '取消'],
                btnAlign: "r",
                area: ['880px', '760px'],
                maxmin: false,
                //禁用最大化，最小化按钮
                resize: false,
                //禁用调整大小
                move: false,
                //禁止拖拽
                skin: "lomo-details",
                content: html,
                yes: function yes(index, layero) {
                  var record = {
                    OrderID: that.list[orderId].Id,
                    Payments: "[{\"PaymentCode\":\"010\",\"PayAmount\":1.0,\"PayContent\":\"00123456432132165\"}]"
                  };
                  that.cancelOrder(index, record, that.url, that.type);
                  return false;
                },
                success: function success(layero, index) {}
              });
            }
          });
        });
      }
    }, {
      key: "election",
      //切换日期
      value: function election(name) {
        $('#' + name + " .online-order-time li").on("click", function () {
          var i = $(this).index();
          $(this).addClass("hover").siblings().removeClass("hover");

          if (i == 4) {
            $(this).parent().next().show();
          } else {
            $(this).parent().next().hide();
          }
        });
      }
    }, {
      key: "cancelOrder",
      //撤单
      value: function cancelOrder(dom, record, url, type) {
        var that = this;
        var opt = that.payType(type, user.PaymentConfig);
        layer.open({
          type: 1,
          title: '确认撤单',
          closeBtn: 1,
          shadeClose: false,
          shade: 0.3,
          btnAlign: "r",
          btn: ['取消', '确定'],
          area: ['700px', '520px'],
          maxmin: false,
          //禁用最大化，最小化按钮
          resize: false,
          //禁用调整大小
          move: false,
          //禁止拖拽
          skin: "lomo-ordinary",
          content: "<div id=\"lomo-cd\" class=\"lomo-gd order-cd\"><div class=\"order-cd-form\"><ul>\n                        <li><em for=\"\">\u5E94\u9000\u91D1\u989D\uFF1A</em><span></span></li>\n                        <li><em for=\"\">\u652F\u4ED8\u5B9D\uFF1A</em><span></span></li>\n                        <li><em for=\"\">\u5FAE\u4FE1\uFF1A</em><span></span></li>\n                        <li class=\"layui-form-item hide\" style=\"overflow:visible\"><label class=\"layui-form-label\">\u9000\u6B3E\u81F3</label>\n                        <div class=\"layui-input-inline\"><select name=\"PaymentCode\" class=\"yhhd\">\n                        ".concat(that.PaymentType(opt), "\n                        </select></div></li>\n                        <li class=\"layui-form-item\"><em>\u8D85\u7EA7\u5BC6\u7801\uFF1A</em><span><input name=\"pwd\" type=\"password\" class=\"cd-form-input pw\" lay-verify=\"required\" /></span></li>\n                        <li class=\"layui-form-item\"><em>\u64A4\u5355\u5907\u6CE8\uFF1A</em><span><textarea name=\"remark\" class=\"cd-form-bz\"></textarea></span></li>\n                      </ul>\n                    </div>\n                  </div>"),
          btn2: function btn2() {
            return false;
          },
          success: function success(layero, index) {
            layero.addClass('layui-form');
            layero.find('.layui-layer-btn1').attr({
              'lay-filter': 'cancel',
              'lay-submit': ''
            });

            _form.render();

            _form.on('submit(cancel)', function (data) {
              var param = {
                OrderID: record.OrderID,
                Remark: data.field.remark ? data.field.remark : "",
                RevokePwd: data.field.pwd,
                PaymentCode: data.field.PaymentCode ? data.field.PaymentCode : ""
              };
              $.http.post(url.cancel, param, user.token, function (res) {
                layer.msg(res.msg);

                if (res.status == 1) {
                  layer.close(dom);
                  layer.close(index);
                }

                ;
              });
              return false;
            });
          }
        });
      }
    }]);

    return Bill;
  }();

  var sufficient = new Bill();
  sufficient.start({
    name: 'sufficient',
    type: 2,
    url: {
      query: LuckVipsoft.api.GetRechargeCountOrderByPaged,
      //查询订单
      details: LuckVipsoft.api.GetRechargeCountOrderByDetail,
      //订单详情
      cancel: LuckVipsoft.api.RevokeRechargeCountOrder,
      //撤单
      reprint: LuckVipsoft.api.RechargeCountOrderRePrint,
      //重打印
      returnGoods: "" //退货

    }
  });
  var recharge = new Bill();
  recharge.start({
    name: 'recharge',
    type: 1,
    url: {
      query: LuckVipsoft.api.GetTopUpOrderByPaged,
      //查询订单
      details: LuckVipsoft.api.GetTopUpOrderByDetail,
      //订单详情
      cancel: LuckVipsoft.api.RevokeTopUpOrder,
      //撤单
      reprint: LuckVipsoft.api.RechargeCountOrderRePrint,
      //重打印
      returnGoods: "" //退货

    }
  });
  var exchange = new Bill();
  exchange.start({
    name: 'exchange',
    type: 3,
    url: {
      query: LuckVipsoft.api.GetRedeemOrderByPaged,
      //查询订单
      details: LuckVipsoft.api.GetRedeemOrderByDetail,
      //订单详情
      cancel: LuckVipsoft.api.RevokeTopUpOrder,
      //撤单
      reprint: LuckVipsoft.api.RevokeRedeemOrder,
      //重打印
      returnGoods: "" //退货

    }
  });
});