/**
 * 电催员电催单日统计
 * @type {{}}
 */
var dayElectric = {
    //变量
    getDictByKey: D.API_PATH +"sys/sysDict/getDictByKey",//获取催收区域、批次、案件类型
    getLoadDept2: D.API_PATH + "sys/departMent/loadDept2",//获取所有部门列表
    sysAddress: D.API_PATH + "sysAddress/getAddress", // 获取地址信息接口
    dayCountPhoneRecord: D.API_PATH + "bus/phoneRecord/dayCountPhoneRecord", //当日电催跟进量
    table:$("#day_electric_table"),//表格
    //方法
    init:function () {
        this.initBootstrapSelect();//初始化下拉框
        this.initSelectData();//初始化下拉数据
        this.initDateTimePicker(); // 初始化时间控件
        this.initFunction();//初始化事件
    },
    initBootstrapSelect:function () {
        //初始化
        this._select("cbatAreaName");
        this._select("cas_typ_bid");
    },
    /**
     * bootstrap-select初始化
     * @param id
     * @private
     */
    _select:function (id,width) {
        $('#'+id).selectpicker({
            width: width == null ? 200 : width,
            height:30,
            actionsBox:true, //在下拉选项添加选中所有和取消选中的按钮
            countSelectedText:"已选中{0}项",
            selectedTextFormat:"count > 5",
            multiple:"true",
            // maxOptions:"2",  //最多可以选中多少个
            // selectedText: 'cat'
            language: "zh-CN", //设置 提示语言
            placeholder: "请选择", // 空值提示内容，选项值为 null
        });
    },
    /**
     * 给下拉框赋值
     * @param id 下拉框id
     * @param type 赋值类型
     */
    selectData:{
        //sysDict表数据
        sysDict: function (id,type) {
            var that = dayElectric;
            D.ajax(that.getDictByKey, D.RESTFUL_POST, {"key":type}, function (res) {
                if (res.code === D.SUCCESS_CODE) {
                    var usage_list=res.detail;
                    var usageHtml = "<option value='-1' selected='selected'>---请选择---</option>";
                    for (var item in usage_list){
                        usageHtml+="<option value='" + usage_list[item].number + "'>" + usage_list[item].value + "</option>";
                    }
                    // 回填数据
                    $("#"+id).html(usageHtml);
                    $("#" + id).selectpicker('refresh');
                }
            });
        },
        //部门列表数据
        sysDept: function (id) {
            var that = dayElectric;
            D.ajax(that.getLoadDept2, D.RESTFUL_POST, {}, function (res) {
                if (res.code === D.SUCCESS_CODE) {
                    var usage_list=res.detail;
                    var usageHtml = "<option value='-1' selected='selected'>---请选择---</option>";
                    for (var item in usage_list){
                        usageHtml+="<option value='" + usage_list[item].depart_number + "'>" + usage_list[item].departname + "</option>";
                    }
                    // 回填数据
                    $("#"+id).html(usageHtml);
                    $("#" + id).selectpicker('refresh');
                }
            });
        },
        //省
        area: function (id,type) {
            var that = dayElectric;
            D.ajax(that.sysAddress, D.RESTFUL_POST, {type:type}, function (res) {
                if (res.code === D.SUCCESS_CODE) {
                    var usage_list=res.detail;
                    var usageHtml = "";
                    for (var item in usage_list){
                        usageHtml+="<option value='" + usage_list[item].provinceId + "'>" + usage_list[item].provinceName + "</option>";
                    }
                    // 回填数据
                    $("#casArea1").html(usageHtml);
                }
            });
        },
        onchangeAddress: function () {
            var that = dayElectric;
            $("#casArea1") .change(function () {
                var area1 = $("#casArea1").val();
                if(area1 == null || area1 == ""){
                    return;
                }
                D.ajax(that.sysAddress, D.RESTFUL_POST, {type: "casArea2",parentId: area1}, function (res) {
                    if (res.code === D.SUCCESS_CODE) {
                        var usage_list=res.detail;
                        var usageHtml = "<option value='-1' selected>请选择</option>";
                        if(usage_list.length <= 0){
                            return;
                        }
                        for (var item in usage_list){
                            usageHtml+="<option value='" + usage_list[item].cityId + "'>" + usage_list[item].cityName + "</option>";
                        }
                        // 回填数据
                        $("#casArea2").html(usageHtml);
                    }
                });
            });
            $("#casArea2") .change(function () {
                var area2 = $("#casArea2").val();
                if(area2 == null || area2 == ""){
                    return;
                }
                D.ajax(that.sysAddress, D.RESTFUL_POST, {type: "casArea3",parentId: area2}, function (res) {
                    if (res.code === D.SUCCESS_CODE) {
                        var usage_list=res.detail;
                        var usageHtml = "<option value='-1' selected>请选择</option>";
                        if(usage_list.length <= 0){
                            return;
                        }
                        for (var item in usage_list){
                            usageHtml+="<option value='" + usage_list[item].districtId + "'>" + usage_list[item].districtName + "</option>";
                        }
                        // 回填数据
                        $("#casArea3").html(usageHtml);
                    }
                });
            });
        },
    },
    /**
     * 初始化下拉数据
     */
    initSelectData: function () {
        //催收区域
        this.selectData.sysDict("cbatAreaName","collection_area");
        //委托方
        this.selectData.sysDict("cas_typ_bid","client");

    },
    initDateTimePicker: function () {
        var that = this;
        // 开始时间
        this.initDate("date_star");
        this.initDate("date_end");
    },
    initDate: function (id) {
        // 开始时间
        $("#"+id).datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            clearBtn:true,// 自定义属性,true 显示 清空按钮 false 隐藏 默认:true
            minView: "month" //选择日期后，不会再跳转去选择时分秒
        });
    },
    queryFunction:function () {
        var that = this;
        var query_ = {};
        var prSeNos = getList("casSeNos");
        var casClAreaIds = listRemoveParam(getObj("cbatAreaName"),"-1");
        var casTypBids = listRemoveParam(getObj("cas_typ_bid"),"-1");
        var prTimeStarte = getObj("date_star");
        var prTimeEnd = getObj("date_end");
        if(prSeNos != null && prTimeStarte != null && prTimeEnd != null) {
            $("#tableDiv").show();
            $("#dayElectricTableTbody").show();
            if ($.trim(prSeNos) != "") query_.prSeNos = prSeNos;
            if ($.trim(casClAreaIds) != "") query_.casClAreaIds = casClAreaIds;
            if ($.trim(casTypBids) != "") query_.casTypBids = casTypBids;
            if ($.trim(prTimeStarte) != "") query_.prTimeStarte = prTimeStarte;
            if ($.trim(prTimeEnd) != "") query_.prTimeEnd = prTimeEnd;
            D.ajax(that.dayCountPhoneRecord,D.RESTFUL_POST,query_,function (row) {
                console.log(row);
                var data = row.detail;
                if(data == null || data.length == 0){
                    $("#dayElectricTableTbodyNone").show();
                    $("#dayElectricTableTbody").hide();
                }else{
                    var tableHtml = "";
                    for(var i=0;i<data.length;i++){
                        tableHtml += "<tr>";
                        tableHtml += "<td>"+data[i].seName+"</td>";
                        tableHtml += "<td>"+data[i].effective8+"</td>";
                        tableHtml += "<td>"+data[i].count8+"</td>";
                        tableHtml += "<td>"+data[i].countCase8+"</td>";
                        tableHtml += "<td>"+data[i].effective8_12+"</td>";
                        tableHtml += "<td>"+data[i].count8_12+"</td>";
                        tableHtml += "<td>"+data[i].countCase8_12+"</td>";
                        tableHtml += "<td>"+data[i].effective12_18+"</td>";
                        tableHtml += "<td>"+data[i].count12_18+"</td>";
                        tableHtml += "<td>"+data[i].countCase12_18+"</td>";
                        tableHtml += "<td>"+data[i].effective18+"</td>";
                        tableHtml += "<td>"+data[i].count18+"</td>";
                        tableHtml += "<td>"+data[i].countCase18+"</td>";
                        tableHtml += "<td>"+data[i].effectiveSum+"</td>";
                        tableHtml += "<td>"+data[i].countSum+"</td>";
                        tableHtml += "<td>"+data[i].countCaseSum+"</td>";
                        tableHtml += "</tr>";
                    }
                    $("#selectDate").html("["+prTimeStarte+" 到 "+prTimeEnd+"]");
                    $("#dayElectricTableTbody").html(tableHtml);
                    $("#dayElectricTableTbody").show();
                    $("#dayElectricTableTbodyNone").hide();
                    //初始化图形数据
                    // that.initImageData(data);
                }
            });
        }else{
            if($.trim(prSeNos) == ""){
                modals.info("催收员不能为空！");
                return;
            }else if($.trim(prTimeStarte) == ""){
                modals.info("起始时间不能为空！");
                return;
            }else if($.trim(prTimeEnd) == ""){
                modals.info("结束时间不能为空！");
                return;
            }else if($.trim(prTimeStarte) != "" && $.trim(prTimeEnd) != ""  && !D.checkDate(prTimeStarte,prTimeEnd)){
                modals.info("起始时间不能大于结束时间");
                return;
            }else if(D.getIntervalMonth(prTimeStarte,prTimeEnd > 6)){
                modals.info("时间间隔不能大于6个月！");
                return;
            }else{
                return;
            }
        }
    },
    //初始化事件
    initFunction:function () {
        var that = this;
        //选择催收员
        $(".selectCasSeNo").click(function () {
            DepEmpTree.initTree("departEmpTree","emp");
        });
        //选择催收员modal确定按钮
        $("#employBtn").click(function () {
            var employeeFilter = function (node) {
                return (node.employeeSign && node.checked);
            }
            var treeObj = $.fn.zTree.getZTreeObj("departEmpTree");
            //获取所有勾选数据
            // var select_nodes = treeObj.getCheckedNodes(true);
            var employee_nodes = treeObj.getNodesByFilter(employeeFilter);
            //选中的id集合字符串
            var ids = "";
            //选中的名称字符串
            var names = "";
            //将选中的id和名称拼接好后放到页面input框中
            if(employee_nodes != null && employee_nodes.length>0){
                for(var i=0;i<employee_nodes.length;i++){
                    var item = employee_nodes[i];
                    if(item.remove != true){
                        if(i==(employee_nodes.length-1)){
                            ids += item.seNo;
                            names += item.name;
                        }else{
                            ids += item.seNo + ",";
                            names += item.name + ",";
                        }
                    }
                }
            }
            //回显
            $("#casSeNosName").text(names);
            $("#casSeNos").val(ids);
            //关闭窗口
            $("#casSeNoModal").modal("hide");
        });
        //查询事件
        $("#queryButton").click(function () {
            that.queryFunction();
        });
        //图形数据切换
        $("#imageBtn1").click(function () {
            $("#radiusImage").hide();
            $("#lineImage").hide();
            $("#barImage").show(500);
        });
        $("#imageBtn2").click(function () {
            $("#radiusImage").hide();
            $("#barImage").hide();
            $("#lineImage").show(500);
        });
        $("#imageBtn3").click(function () {
            $("#lineImage").hide();
            $("#barImage").hide();
            $("#radiusImage").show(500);
        });
    },
    //获取 饼图 ， 折线图 ，柱状图的数据
    initImageData :function (data) {
        var that = this;
        var backMoneys = data;
        if(backMoneys != null){
            var showData = []; //饼图所需要的数据
            var lineXData = []; //折线图 x轴数据。
            var lineYData = []; //折线图 y轴数据。
            for(var i=0;i<backMoneys.length;i++){
                var obj = backMoneys[i] ;
                var backMoney = {};
                var sumMoney = obj.countCaseSum; //
                var time = obj.countSum;
                var radiusTime = time+" (¥"+D.format_number(sumMoney)+")";

                //组装饼图数据
                backMoney.value = obj.countCaseSum; //
                backMoney.name = radiusTime; //时间 + 还款 字符串。
                showData.push(backMoney);
                //组装折线图数据
                lineXData.push(time);
                lineYData.push(sumMoney);
            }

            //画柱状图
            that.drawBarImage(lineXData,lineYData);
            //画折线图
            that.initLineImage(lineXData,lineYData);
            //画饼图
            that.drawRadiusImage(showData);
        }
    },
    //柱图
    drawBarImage : function (xData,yData) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('barImage'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    //饼图
    drawRadiusImage : function (showData) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('radiusImage'));
        // 指定图表的配置项和数据
        var option = {
            toolbox: {
                show: true,
                feature: {
                    //dataView: {readOnly: false},
                    //magicType: {type: ['line', 'bar','pie']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    data:showData
                }
            ],
            /* itemStyle: {
                 normal: {
                     shadowBlur: 200,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
             }*/
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        /*var option = {
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:794042, name:'2017-02 (¥794042)'},
                        {value:822956, name:'2017-03 (¥822956)'},
                        {value:87904, name:'2017-04 (¥87904)'},
                        {value:0, name:'2017-05 (¥0)'},
                        {value:0, name:'2017-06 (¥0)'},
                        {value:0, name:'2017-07 (¥0)'}
                    ]
                }
            ]
        };*/

    },

    //折线图
    initLineImage : function (xData , yData) {
        var chart = document.getElementById("lineImage");
        var echart = echarts.init(chart);
        var option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                //data:['苹果','香蕉']
            },
            toolbox: {
                show: true,
                feature: {
                    /*dataZoom: {
                        yAxisIndex: 'none'
                    },*/
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar','pie']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    //data : ['第一季度','第二季度','第三季度','第四季度']
                    data : xData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [

                {
                    //name:'苹果',
                    type:'line',
                    stack: '销量',
                    //areaStyle: {normal: {}},
                    //data:[1270, 6382, 2091, 1034]
                    data:yData,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter:function(obj) {
                                //console.info(value);
                                return "¥"+D.format_number(obj.value);
                            }
                        }
                    },
                }
                /*,
                {
                    name:'香蕉',
                    type:'line',
                    stack: '销量',
                    areaStyle: {normal: {}},
                    data:[2270, 3456, 5432, 3423]
                }  */
            ]
        };
        echart.setOption(option);
    },
}

/**
 * [部门、催收员树]
 * @auth       demoxue
 * @createdate 2017年5月18日
 */
var DepEmpTree = {
    loadAllDepart:D.API_PATH + "sys/departMent/loadDept2",
    loadEmployByDepId:D.API_PATH +"sys/employ/loadByDepartMentId",
    getDepartMentEmployeeTree: D.API_PATH + "sys/departMent/getDepartMentEmployeeTree", //部门员工树

    init: function () {
        this.initDepart();
    },

    /**
     * zTree配置信息
     */
    empSetting:{//员工setting
        view: {
            // showLine: false,
            showIcon: true,
        },
        data: {
            simpleData: {
                enable: true,
                idKey:"id",
                pIdKey:"pid"
            },
            key:{
                name:"name"
            }
        },
        check: {
            autoCheckTrigger:false,
            chkboxType: { "Y": "s", "N": "ps" },
            chkStyle: "checkbox",
            enable: true,
            autoCheckTrigger: true,
            radioType: "level"
        },
        /*callback : {
            onClick:function(event, treeId, treeNode){DepEmpTree.addSubNode(treeNode)},
            onExpand: function (event, treeId, treeNode) {DepEmpTree.addSubNode(treeNode);}
        }*/
    },
    partSetting:{//部门setting
        view: {
            // showLine: false,
            showIcon: false,
        },
        data: {
            simpleData: {
                enable: true,
                idKey:"id",
                pIdKey:"pid"
            },
            key:{
                name:"name"
            }
        },
        check: {
            autoCheckTrigger:false,
            chkboxType: { "Y": "s", "N": "ps" },
            chkStyle: "checkbox",
            enable: true,
            autoCheckTrigger: true,
            radioType: "level"
        }
    },
    addSubNode:function(treeNode) {
        var that=this;
        if (!treeNode.isParent) return;
        var childrenNodes = treeNode.children;
        if(childrenNodes!=null&&childrenNodes.length!=0){
            var lastNode=childrenNodes[childrenNodes.length-1];
            if(lastNode.seNo){
                return;
            }
        }
        $.ajax({
            type: "post",
            url: that.loadEmployByDepId,
            data: { "departMentId": treeNode.id },
            async: true,
            success: function (data) {
                $.each(data.detail,function(i,v){
                    v.name=v.seName;
                    v.id=v.seNo;
                    v.isEmployee = true;
                    v.pid=0;
                });
                var treeObj = $.fn.zTree.getZTreeObj("departEmpTree");
                newNode = treeObj.addNodes(treeNode, -1, data.detail);
            },
            error: function (data) {
                alert("error");
            }
        });
    },
    initTree:function(treeId,type){
        var that=this;
        var zNodes;
        var zTree;
        $.ajax({
            type: "post",
            async:false,
            dataType:"json",
            url: that.getDepartMentEmployeeTree,
            success: function (data) {
                var treeObj = data.detail;
                setTreeName(treeObj);
                zNodes = data.detail;
            },
            error: function (data) {
                alert("error");
            }
        });
        var setting;
        if(type == "part"){
            setting = that.partSetting;
        }else if(type == "emp"){
            setting = that.empSetting;
        }
        zTree = $.fn.zTree.init($("#"+treeId), setting, zNodes);
        // zTree.expandAll(false);
        // zTree.expandNode(zTree.getNodes()[0], true, false, true);
    },
}

function setTreeName(obj) {
    var children = obj.children;
    if(obj.id == 0){
        obj.name = obj.departname;
        obj.icon = "../images/business/orgopen.gif";
    }
    if(children != null && children.length > 0){
        for(var i=0;i<children.length;i++){
            var v = children[i];
            if(v.employeeSign == null || (!v.employeeSign)){//部门
                v.name = v.departname;
                v.icon = "../images/business/orgopen.gif";
            }else{//员工
                v.name = v.seName+ (v.seJobTitle == null ? "" : "["+v.seJobTitle+"]");
                if(v.seSex == "1"){
                    v.icon = "../images/business/empnode_m.gif";
                }else if(v.seSex == "0"){
                    v.icon = "../images/business/empnode_w.gif";
                }
            }
            setTreeName(v);
        }
    }
}

function getList(id) {
    var obj = getObj(id);
    if(obj == null){
        return null;
    }
    var result = new Array();
    var objList = obj.split("\n");
    for(var i=0; i<objList.length; i++){
        result.push(objList[i]);
    }
    //将换行数据封装到数组里面去
    return result;
}


//拼装多选数据
function getObj(id) {
    if(id == null || id == ""){
        return null;
    }
    var obj = $("#"+id).val();
    if(obj == null || obj == "" || obj == undefined || obj == "undefined" || obj.length == 0){
        return null;
    }
    return obj;
}

/**
 *  集合中存在某个元素时，直接返回空对象
 * @param obj 数组对象
 * @param param 判断是否存在的元素
 */
function listRemoveParam(obj,param){
    if(obj == null){
        return null;
    }
    // var result = new Array();
    if("string" == typeof obj){
        if(param == obj){
            return null;
        }else{
            return obj;
        }
    }else{
        if(-1 != $.inArray(param, obj) || param == obj){
            return null;
        }else{
            // result.push(obj);
            return obj;
        }
    }
}



$(function () {
    dayElectric.init();
});