 $("#importExl").click(function () {
            var that = this;
            //获取选中字段
            var attr = ["催收员","跟进个案量（案件数）","通电总数","当天9:00前通电量","9:00~11:00通电量","11:30~14:00通电量","14:00~17:30通电量","17:30~18:30通电量","18:30~19:30通电量","19:30后通电量"];
            var title = [seName,countCase,countSum,effective9,effective9_11h,effective11h_14,effective14_17h,effective17h_18h,effective18h_19h,effective19h];
            var requestParam = that.exportQueryResultsExcel;
            var acountDetailForm = document.createElement("form");
            //一定要加入到body中！！
            var docc = window.parent.document;
            docc.body.appendChild(acountDetailForm);
            acountDetailForm.method = 'post';
            acountDetailForm.target = '_blank';
            //创建隐藏表单
            var attr_input=document.createElement("input");
            attr_input.setAttribute("name","attr");
            attr_input.setAttribute("type","hidden");
            attr_input.setAttribute("value",String(attr));

            var title_input=document.createElement("input");
            title_input.setAttribute("name","title");
            title_input.setAttribute("type","hidden");
            title_input.setAttribute("value",String(title));

            var casePaidDto=document.createElement("input");
            casePaidDto.setAttribute("type","hidden");
            if(type == "query"){
                acountDetailForm.action = that.exportResultCasePaidCpExcel;
                casePaidDto.setAttribute("name","casePaidDto");
                casePaidDto.setAttribute("value",JSON.stringify(requestParam));
            }else if(type == "select"){
                acountDetailForm.action = that.exportSelectCasePaidExcel;
                casePaidDto.setAttribute("name","casePaidIdsArray");
                casePaidDto.setAttribute("value",idList.toString());
            }
            acountDetailForm.appendChild(attr_input);
            acountDetailForm.appendChild(title_input);
            acountDetailForm.appendChild(casePaidDto);
            acountDetailForm.submit();
        });