angular.module("RedePga",["kendo.directives","ngFileUpload","highcharts-ng"]),$(document).ready(function(){kendo.culture("pt-BR"),$(".button-collapse").sideNav(),$(".collapsible").collapsible({accordion:!1})}),angular.module("RedePga").controller("AdminInputsCtrl",["$scope","$http",function(e,t){e.sortableOptions={update:function(e,a){var o=$(this).sortable("serialize");t.get(baseUrl+"cms/inputs/sortable?"+o).then(function(e){console.log(e.data)})}}}]).controller("FeedCtrl",["$scope",function(e){e.reset_search=function(){e.search.$=""},e.role_helper=function(e){var t={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terapeuta",mediator:"Mediador",coordinator:"Coordenador",user:"Estudante"};return t[e]}}]).controller("ExerciciosCtrl",["$scope","$http","$timeout","$interval","Exercicios","Upload",function(e,t,a,o,n,r){n.fetch_all().then(function(t){e.exercicios=t.data},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.resposta={},e.carregando=!1,e.carregando_porcentagem=0,e.reset_search=function(){e.search.$="",e.fechar()},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(t){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=t?t:!1},e.upload=function(t,a){e.carregando=!0,e.carregando_porcentagem=1,e.resposta.id=t,e.resposta.user_id=a,n.add_reply(e.resposta).then(function(t){e.resposta_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(e){alert("Aconteceu um erro ao ser enviado a resposta. Tente novamente.")},function(t){var a=parseInt(100*evt.loaded/evt.total);e.carregando_porcentagem=a})}}]).controller("BatePapoCtrl",["$scope","$http","$timeout","$interval","Mensagens",function(e,t,a,o,n){n.fetch_all().then(function(t){e.mensagens=t.data},function(){alert("Ocorreu um erro ao carregar as mensagens do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.reset_search=function(){e.search.$="",e.fechar()},e.enviar_nova_mensagem=function(t,a,r,s){t={to:t.to,model:a,model_id:r,author:s,content:t.content,name:t.name},n.add_message(t).then(function(t){e.mensagem_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível incluir a mensagem!")})},e.btn_nova_mensagem=function(){e.janela_expandida=!0,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!0},e.enviar_resposta=function(t,a,r,s,i){t={content:t.content,model:r,model_id:s,message_id:a,author:i},e.mensagem_selecionada.replies.push(t),n.add_reply(t).then(function(t){e.resposta_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível salvar a sua resposta")})},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(t){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=t?t:!1}}]).controller("ListarRegistrosCtrl",["$scope","$http",function(e,t){e.filtro={ano:null,mes:null,aula:null},e.meses=[{nome:"Janeiro",registros:0,numero:1},{nome:"Fevereiro",registros:0,numero:2},{nome:"Março",registros:0,numero:3},{nome:"Abril",registros:0,numero:4},{nome:"Maio",registros:0,numero:5},{nome:"Junho",registros:0,numero:6},{nome:"Julho",registros:0,numero:7},{nome:"Agosto",registros:0,numero:8},{nome:"Setembro",registros:0,numero:9},{nome:"Outubro",registros:0,numero:10},{nome:"Novembro",registros:0,numero:11},{nome:"Dezembro",registros:0,numero:12}],e.meses_registros=[],e.aulas=[],t.post(baseUrl+"registros/api_registros_por_ano").then(function(t){e.aulas=t.data.lessons,e.meses_registros=t.data.meses}),e.reset_search=function(){e.search.$="",e.voltarParaAulas()},e.selecionarAula=function(t){e.filtro.aula=t,$("#listagem-aulas").slideUp(500,function(){$("#listagem-detalhes").slideDown(500)})},e.mudarAno=function(){$("#listagem-detalhes,#listagem-aulas,#listagem-meses").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.getTotalRegistros=function(t){var a=0;return angular.forEach(e.meses_registros,function(e,o){o==t&&(a=e)}),a},e.selecionarMes=function(t){e.filtro.mes=t,$("#listagem-meses").slideUp(500,function(){$("#listagem-aulas").slideDown(500)})},e.voltarParaMeses=function(){$("#listagem-detalhes,#listagem-aulas").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.voltarParaAulas=function(){$("#listagem-detalhes").slideUp(500,function(){e.filtro.aula=null,$("#listagem-aulas").slideDown(500)})}}]).controller("EditarRegistroCtrl",["$scope","Inputs",function(e,t){e.registros=[],e.lesson_id=angular.element("#registros-container").data("id"),t.fetch_all(e.lesson_id).then(function(t){e.registros=t.data.registros,e.campos=t.data.campos})}]).controller("EvolucaoCtrl",["$scope","$filter",function(e,t){e.date_start="01/01/"+t("date")(new Date,"yyyy"),e.date_finish=t("date")(new Date,"dd/MM/yyyy"),e.graficos={atencao_por_materia_mensal:{options:{chart:{type:"line"},plotOptions:{series:{stacking:"normal"}}},series:[{name:"Matemática",data:[1,2,4,7,3,1,10,20,1,10,20],id:"series-0",type:"line",color:"blue",dashStyle:"ShortDash",connectNulls:!0},{data:[15,20,7,7,4,13,3,15,20,4],id:"series-4",name:"Física",type:"line",color:"orange",dashStyle:"LongDash",connectNulls:!1},{data:[19,20,9,2,14,1,6,15,15,8],id:"series-5",name:"Química",type:"line",color:"gray",dashStyle:"ShortDot"},{data:[18,3,15,3,6,18,11,16,14,5],id:"series-6",name:"Português",type:"line",color:"yellow"}],title:{text:"Atenção por matéria"},credits:{enabled:!1},loading:!1,size:{},subtitle:{text:"Mensal"},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},atencao_independencia_autonomia_geral_mensal:{options:{chart:{type:"line"},plotOptions:{series:{stacking:"normal"}}},series:[{name:"Autonomia",data:[1,2,4,7,3,1,10,20,1,10,20],id:"series-0",type:"line",color:"blue",dashStyle:"ShortDash",connectNulls:!0},{data:[15,20,7,7,5,13,3,15,20,4],id:"series-4",name:"Independencia",type:"line",color:"orange",dashStyle:"LongDash",connectNulls:!1},{data:[19,20,9,2,14,1,6,15,15,8],id:"series-5",name:"Atenção",type:"line",color:"gray",dashStyle:"ShortDot"}],title:{text:"Atenção/Independencia/Autonomia"},credits:{enabled:!1},loading:!1,size:{},subtitle:{text:"(Geral-Mensal)"},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}}}}]).controller("AdicionarRegistrosCtrl",["$scope","$http","Inputs",function(e,t,a){e.avancar=!1,e.mudouData=function(){var t=kendo.toString(this.value(),"yyyy-MM-dd");a.validar_data(t).then(function(t){console.log(t.data),"INDISPONÍVEL"==t.data.status?e.avancar=!1:e.avancar=!0,Materialize.toast(t.data.message,1e4)})}}]).controller("AuthenticationController",["$scope",function(e){Materialize.showStaggeredList("#pep-lista-atores"),Materialize.fadeInImage("img"),e.roleChecked=!1,e.roles={"tutors.tutor":"Tutor(a)","schools.mediator":"Mediador(a)","schools.coordinator":"Coordenador(a)","protectors.dad":"Pai","protectors.mom":"Mãe","therapists.therapist":"Terapeuta","users.user":"Aluno(a)"},e.roles_icons={"tutors.tutor":"graduation-cap","schools.mediator":"users","schools.coordinator":"building","protectors.dad":"male","protectors.mom":"female","therapists.therapist":"user-md","users.user":"user"},e.setRole=function(t){e.roleChecked=t},e.getRole=function(){return void 0==e.roles[e.roleChecked]?"Quem é você?":e.roles[e.roleChecked]},e.getRoleIcon=function(){return e.roles_icons[e.roleChecked]},e.clear=function(){e.roleChecked=!1}}]).controller("CmsInputCtrl",["$scope",function(e){e.keyPressed=function(t){console.log(t.which),2==t.which&&e.adicionar_mais()},e.adicionar_mais=function(){e.input.config.options.push(""),setTimeout(function(){$("textarea").last().focus()},0)},e.$watch("input.type",function(t){"escala_texto"==t&&void 0==e.input.config&&(e.input.config={options:[""]})})}]).controller("CmsChartsCtrl",["$scope",function(e){e.$watch("chart",function(t){0==t.chart_inputs.length&&(e.chart.chart_inputs=[""])})}]),angular.module("RedePga").directive("shortcut",function(){return{restrict:"E",replace:!0,scope:!0,link:function(e,t,a){jQuery(document).on("keypress",function(t){e.$apply(e.keyPressed(t))})}}}).directive("selectAluno",function(){return{link:function(e,t,a){$(t).change(function(){$(this).parent().submit()})}}}).directive("selectTwo",function(){return{link:function(e,t,a){}}}).directive("slimscroll",function(){return{link:function(e,t,a){$(t).slimScroll({height:"480px",alwaysVisible:!0,railVisible:!0,position:"right"})}}}).directive("escolherCampo",function(){return{link:function(e,t,a){t.bind("change",function(){var o=t.find(":selected").data("type"),n=t.find(":selected").data("config"),r=a.indice;e.registros[r].type=o,"escala_numerica"==o?(e.registros[r].value=n.min,e.registros[r].config=n):"escala_texto"==o?(e.registros[r].value=n.options[0],e.registros[r].config=n):e.registros[r].value=null,e.$apply()})}}}).directive("datepicker",function(){return function(e,t,a){$(t).datepicker({inline:!0,dateFormat:"dd/mm/yy",changeMonth:!0,changeYear:!0,yearRange:"c-65:c+10"})}}),angular.module("RedePga").factory("Inputs",["$http",function(e){return{fetch_all:function(t){return e.get(baseUrl+"registros/api_inputs/"+t)},validar_data:function(t){return e.get(baseUrl+"registros/api_validar_data?data="+t)}}}]).factory("Exercicios",["$http","Upload",function(e,t){return{add_reply:function(e){return t.upload({url:baseUrl+"exercicios/api_add_reply",data:{anexo:e.attachment,resposta:e}})},fetch_all:function(){return e.get(baseUrl+"Exercicios/api_fetch_all")}}}]).factory("Mensagens",["$http",function(e){return{add_message:function(t){return e.post("BatePapo/api_add_message",t)},add_reply:function(t){return e.post("BatePapo/api_add_reply",t)},fetch_all:function(){return e.get("BatePapo/api_fetch_all")}}}]),angular.module("RedePga").controller("ConfigurarAtoresCtrl",["$scope","$http","$filter","$timeout",function(e,t,a,o){e.actor={model:"Protectors"},e.get_label=function(e){var t={mediator:"Mediador",coordinator:"Coordenador",dad:"Pai",mom:"Mãe",therapist:"Terapeuta",tutor:"Tutor"};return t[e]},e.set_model=function(t){e.actor={model:t},"Tutors"==t&&(e.actor.role="tutor"),"Therapists"==t&&(e.actor.role="therapist")},e.set_actor=function(t,a){t.model=a,t.instituition_id=e.instituitions[t.instituition_id],delete t.password,e.actor=t};var n=document.location.toString();if(n.match("#")){var r=n.split("#")[1],s=r.replace("c_","");e.set_model(s),$(".panel-collapse").removeClass("in"),$("#"+r).addClass("in")}}]).controller("NovoGraficoCtrl",["$scope","$http","$filter","$timeout",function(e,t,a,o){e.emptyChart={title:{text:"Exemplo"},subtitle:{text:"Subtítulo aqui"},options:{date_start:"01/01/"+a("date")(new Date,"yyyy"),date_finish:a("date")(new Date,"dd/MM/yyyy"),format:"mensal",chart:{type:"line"}},series:[{name:"Dados de exemplo - preencha o cadastro corretamente",type:"line",data:[1,2,4,7,3],id:"series-0",color:"#CFC000"}],xAxis:{}},e.$watch("emptyChart.options.format",function(t,a){o(function(){"mensal"==t?e.emptyChart.xAxis.categories=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]:e.emptyChart.xAxis.categories=null})}),t({method:"GET",url:baseUrl+"cms/api/inputs_disponiveis"}).then(function(t){e.inputs=t.data},function(e){}),t({method:"GET",url:baseUrl+"cms/api/materias_disponiveis"}).then(function(t){e.materias=t.data},function(e){}),e.trocou=function(){t({method:"POST",url:baseUrl+"cms/api/materias_disponiveis"}).then(function(t){e.materias=t.data},function(e){})},e.adicionar=function(){e.emptyChart.series.push({name:"Dados de exemplo - preencha o cadastro corretamento",type:"line",data:[Math.floor(10*Math.random()+1),Math.floor(10*Math.random()+1),Math.floor(10*Math.random()+1),Math.floor(10*Math.random()+1),Math.floor(10*Math.random()+1)],id:"series-"+e.emptyChart.series.length+1,color:"#CFC000"})}}]);