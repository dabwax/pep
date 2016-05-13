angular.module("RedePga",["ngSanitize","ngFileUpload","highcharts-ng","ngTagsInput","masonry"]),$(document).ready(function(){$(".button-collapse").sideNav(),$(".dropdown-button").on("click",function(){setTimeout(function(){$("#slide-out").scrollTop(99999)},300)}),$(".dropdown-button").dropdown({inDuration:300,outDuration:225,constrain_width:!0,gutter:0,belowOrigin:!0,alignment:"left"}),$(".collapsible").collapsible({accordion:!1})}),angular.module("RedePga").controller("AdminInputsCtrl",["$scope","$http",function(e,t){e.sortableOptions={update:function(e,a){var o=$(this).sortable("serialize");t.get(baseUrl+"cms/inputs/sortable?"+o).then(function(e){})}}}]).controller("FeedCtrl",["$scope","Feed","$window","$timeout",function(e,t,a,o){e.lessons=[],t.fetch_all(a.location.search).then(function(t){e.lessons=t.data,o(function(){var t=$("#masonry-grid").data("card");""!=t&&angular.forEach(e.lessons,function(e){var a=e.date_d+"/"+e.date_m+"/"+e.date_y;a==t&&$("#modal"+e.id).openModal()})})},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.reset_search=function(){e.search.$=""},e.role_helper=function(e){var t={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terap.",mediator:"Mediad.",coordinator:"Coord.",user:"Est."};return t[e]},e.materiaAtual=!1,e.mostrarMateria=function(t){0==e.materiaAtual?e.materiaAtual=t:e.materiaAtual=!1},e.mostrarDados=function(t,a){null!=t?e.mostrar=t:a.length>0&&(first=a[Object.keys(a)[0]],e.mostrar=first.role)}}]).controller("ExerciciosCtrl",["$scope","$http","$timeout","$interval","Exercicios","Upload",function(e,t,a,o,n,r){n.fetch_all().then(function(t){e.exercicios=t.data},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.resposta={},e.carregando=!1,e.carregando_porcentagem=0,e.reset_search=function(){e.search.$="",e.fechar()},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(t){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=t?t:!1},e.upload=function(t,a){e.carregando=!0,e.carregando_porcentagem=1,e.resposta.id=t,e.resposta.user_id=a,n.add_reply(e.resposta).then(function(t){e.resposta_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(e){alert("Aconteceu um erro ao ser enviado a resposta. Tente novamente.")},function(t){var a=parseInt(100*evt.loaded/evt.total);e.carregando_porcentagem=a})}}]).controller("BatePapoCtrl",["$scope","$http","$timeout","$interval","Mensagens",function(e,t,a,o,n){n.fetch_all().then(function(t){e.mensagens=t.data},function(){alert("Ocorreu um erro ao carregar as mensagens do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.reset_search=function(){e.search.$="",e.fechar()},e.enviar_nova_mensagem=function(t,a,r,s){t={to:t.to,model:a,model_id:r,author:s,content:t.content,name:t.name},n.add_message(t).then(function(t){e.mensagem_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível incluir a mensagem!")})},e.btn_nova_mensagem=function(){e.janela_expandida=!0,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!0},e.enviar_resposta=function(t,a,r,s,i){t={content:t.content,model:r,model_id:s,message_id:a,author:i},e.mensagem_selecionada.replies.push(t),n.add_reply(t).then(function(t){e.resposta_enviada=!0,e.segundos_restantes=3,o(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível salvar a sua resposta")})},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(t){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=t?t:!1}}]).controller("ListarRegistrosCtrl",["$scope","$http",function(e,t){e.filtro={ano:null,mes:null,aula:null},e.meses=[{nome:"Janeiro",registros:0,numero:1},{nome:"Fevereiro",registros:0,numero:2},{nome:"Março",registros:0,numero:3},{nome:"Abril",registros:0,numero:4},{nome:"Maio",registros:0,numero:5},{nome:"Junho",registros:0,numero:6},{nome:"Julho",registros:0,numero:7},{nome:"Agosto",registros:0,numero:8},{nome:"Setembro",registros:0,numero:9},{nome:"Outubro",registros:0,numero:10},{nome:"Novembro",registros:0,numero:11},{nome:"Dezembro",registros:0,numero:12}],e.meses_registros=[],e.aulas=[],t.post(baseUrl+"registros/api_registros_por_ano").then(function(t){e.aulas=t.data.lessons,e.meses_registros=t.data.meses}),e.reset_search=function(){e.search.$="",e.voltarParaAulas()},e.selecionarAula=function(t){e.filtro.aula=t,$("#listagem-aulas").slideUp(500,function(){$("#listagem-detalhes").slideDown(500)})},e.mudarAno=function(){$("#listagem-detalhes,#listagem-aulas,#listagem-meses").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.getTotalRegistros=function(t){var a=0;return angular.forEach(e.meses_registros,function(e,o){o==t&&(a=e)}),a},e.selecionarMes=function(t){e.filtro.mes=t,$("#listagem-meses").slideUp(500,function(){$("#listagem-aulas").slideDown(500)})},e.voltarParaMeses=function(){$("#listagem-detalhes,#listagem-aulas").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.voltarParaAulas=function(){$("#listagem-detalhes").slideUp(500,function(){e.filtro.aula=null,$("#listagem-aulas").slideDown(500)})}}]).controller("EditarRegistroCtrl",["$scope","Inputs","$timeout",function(e,t,a){e.registros=[],e.avancar=!0,e.init=function(){e.hashtags=$("#registros-container").data("hashtags"),e.materias=$("#registros-container").data("materias"),e.admin_logged=$("#registros-container").data("admin-logged"),e.lesson_id=$("#registros-container").data("lesson-id"),console.log(e.lesson_id),t.fetch_all(e.lesson_id).then(function(t){e.registros=t.data.registros,e.campos=t.data.campos})},e.mudouData=function(a){t.validar_data(a).then(function(t){"INDISPONÍVEL"==t.data.status?e.avancar=!1:e.avancar=!0,Materialize.toast(t.data.message,1e4)})}}]).controller("EvolucaoCtrl",["$scope","$filter",function(e,t){e.graficos=[],$("div.grafico").each(function(){var t=$(this).data("dados");t.options.plotOptions.series.point={events:{click:function(){var e=this.name,t=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(t){var a=baseUrl+"feed?card="+e,o=window.open(a,"_blank");o.focus()}}}},console.log(t),e.graficos.push(t)})}]).controller("AdicionarRegistrosCtrl",["$scope","$http","Inputs",function(e,t,a){e.avancar=!1,e.mudouData=function(t){a.validar_data(t).then(function(t){"INDISPONÍVEL"==t.data.status?e.avancar=!1:e.avancar=!0,Materialize.toast(t.data.message,1e4)})}}]).controller("AuthenticationController",["$scope",function(e){Materialize.showStaggeredList("#pep-lista-atores"),Materialize.fadeInImage("img"),e.roleChecked=!1,e.roles={"tutors.tutor":"Tutor(a)","schools.mediator":"Mediador(a)","schools.coordinator":"Coordenador(a)","protectors.dad":"Pai","protectors.mom":"Mãe","therapists.therapist":"Terapeuta","users.user":"Aluno(a)"},e.roles_icons={"tutors.tutor":"graduation-cap","schools.mediator":"users","schools.coordinator":"building","protectors.dad":"male","protectors.mom":"female","therapists.therapist":"user-md","users.user":"user"},e.setRole=function(t){e.roleChecked=t},e.getRole=function(){return void 0==e.roles[e.roleChecked]?"Quem é você?":e.roles[e.roleChecked]},e.getRoleIcon=function(){return e.roles_icons[e.roleChecked]},e.clear=function(){e.roleChecked=!1}}]).controller("CmsInputCtrl",["$scope",function(e){e.keyPressed=function(t){console.log(t.which),2==t.which&&e.adicionar_mais()},e.adicionar_mais=function(){e.input.config.options.push(""),setTimeout(function(){$("textarea").last().focus()},0)},e.$watch("input.type",function(t){"escala_texto"==t&&void 0==e.input.config&&(e.input.config={options:[""]})})}]).controller("CmsChartsCtrl",["$scope",function(e){e.$watch("chart",function(t){0==t.chart_inputs.length&&(e.chart.chart_inputs=[""])})}]),angular.module("RedePga").directive("loading",["$http",function(e){return{restrict:"A",link:function(t,a,o){t.isLoading=function(){return e.pendingRequests.length>0},t.$watch(t.isLoading,function(e){e?a.removeClass("ng-hide"):a.addClass("ng-hide")})}}}]).directive("modal",function(){return{link:function(e,t,a){$(t).click(function(){var e=$(t).data("id");$("#modal"+e).openModal()})}}}).directive("datepicker",function(){return{link:function(e,t,a){$(t).datepicker({dateFormat:"dd/mm/yy"})}}}).directive("editor",function(){return{link:function(e,t,a){$(t).trumbowyg({btns:["formatting","btnGrp-semantic","link","btnGrp-justify","btnGrp-lists"]})}}}).directive("tabs",function(){return{link:function(e,t,a){$(t).tabs()}}}).directive("selectAluno",function(){return{link:function(e,t,a){$(t).change(function(){$(this).parent().submit()})}}}).directive("escolherCampo",function(){return{link:function(e,t,a){t.bind("change",function(){var o=t.find(":selected").data("type"),n=t.find(":selected").data("config"),r=a.indice;e.registros[r].type=o,"escala_numerica"==o?(e.registros[r].value=n.min,e.registros[r].config=n):"escala_texto"==o?(e.registros[r].value=n.options[0],e.registros[r].config=n):e.registros[r].value=null,e.$apply()})}}}),angular.module("RedePga").factory("Feed",["$http",function(e){return{fetch_all:function(t){return e.get(baseUrl+"feed/api/"+t)}}}]).factory("Inputs",["$http",function(e){return{fetch_all:function(t){return e.get(baseUrl+"registros/api_inputs/"+t)},validar_data:function(t){return e.get(baseUrl+"registros/api_validar_data?data="+t)}}}]).factory("Exercicios",["$http","Upload",function(e,t){return{add_reply:function(e){return t.upload({url:baseUrl+"exercicios/api_add_reply",data:{anexo:e.attachment,resposta:e}})},fetch_all:function(){return e.get(baseUrl+"Exercicios/api_fetch_all")}}}]).factory("Mensagens",["$http",function(e){return{add_message:function(t){return e.post("BatePapo/api_add_message",t)},add_reply:function(t){return e.post("BatePapo/api_add_reply",t)},fetch_all:function(){return e.get("BatePapo/api_fetch_all")}}}]),angular.module("RedePga").controller("FormularioEdicaoUsuario",["$scope",function(e){}]).controller("ConfigurarAtoresCtrl",["$scope","$http","$filter","$timeout",function(e,t,a,o){e.actor={model:"Protectors"},e.cancelarEdicao=function(){e.actor={model:"Protectors"}},e.get_label=function(e){var t={mediator:"Mediador",coordinator:"Coordenador",dad:"Pai",mom:"Mãe",therapist:"Terapeuta",tutor:"Tutor"};return t[e]},e.set_model=function(t){e.actor={model:t},"Tutors"==t&&(e.actor.role="tutor"),"Therapists"==t&&(e.actor.role="therapist")},e.set_actor=function(t,a){t.model=a,t.instituition_id=e.instituitions[t.instituition_id],delete t.password,e.actor=t};var n=document.location.toString();if(n.match("#")){var r=n.split("#")[1],s=r.replace("c_","");e.set_model(s),$(".panel-collapse").removeClass("in"),$("#"+r).addClass("in")}$(document).on("click",".ui-tabs-anchor",function(){o(function(){e.cancelarEdicao()})})}]).controller("NovoGraficoCtrl",["$scope","$http","$filter","$timeout",function(e,t,a,o){e.serieEmBranco=null,o(function(){var t=$("#card-grafico").data("chart");e.user_id=$("#card-grafico").data("user_id"),"undefined"!=t&&(e.emptyChart=t,e.serieEmBranco=e.emptyChart.series[0])}),t({method:"GET",url:baseUrl+"cms/api/inputs_disponiveis"}).then(function(t){e.inputs=t.data},function(e){}),t({method:"GET",url:baseUrl+"cms/api/materias_disponiveis"}).then(function(t){e.materias=t.data},function(e){}),e.mudouGrafico=function(){e.emptyChart.series.forEach(function(t,a){t.input_id&&e.trocou(a)})},e.trocou=function(a){var o=0;void 0!=e.emptyChart.series[a].theme_id&&(o=e.emptyChart.series[a].theme_id);var n={formato:e.emptyChart.format,tipo:e.emptyChart.series[a].type,materia:o,input:e.emptyChart.series[a].input_id,user_id:e.user_id};t.get(baseUrl+"cms/api/calcular_serie/"+n.user_id+"/"+n.input+"/"+n.formato+"/"+n.materia).then(function(t){e.emptyChart.series[a].data=t.data.data,"text"==t.data.type&&(e.emptyChart.series[a].type="pie")},function(e){})},e.adicionar=function(){var t={id:Math.floor(1e4*Math.random()+1),name:"Exemplo "+Math.floor(1e4*Math.random()+1),color:"#446CB3",type:"line"};o(function(){e.emptyChart.series.push(t)})},e.deletarSerie=function(t){return confirm("Voce tem certeza disto?")&&e.emptyChart.series.splice(t,1),!1}}]);
