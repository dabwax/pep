angular.module("RedePga",[]),$(document).ready(function(){$(".button-collapse").sideNav()}),angular.module("RedePga").controller("AdminInputsCtrl",["$scope","$http",function(e,o){e.sortableOptions={update:function(e,t){var a=$(this).sortable("serialize");o.get(baseUrl+"cms/inputs/sortable?"+a).then(function(e){console.log(e.data)})}}}]).controller("ConfigurarAtoresCtrl",["$scope",function(e){e.actor={model:"Protectors"},e.get_label=function(e){var o={mediator:"Mediador",coordinator:"Coordenador",dad:"Pai",mom:"Mãe",therapist:"Terapeuta",tutor:"Tutor"};return o[e]},e.set_model=function(o){e.actor={model:o},"Tutors"==o&&(e.actor.role="tutor"),"Therapists"==o&&(e.actor.role="therapist")},e.set_actor=function(o,t){o.model=t,o.instituition_id=e.instituitions[o.instituition_id],e.actor=o};var o=document.location.toString();if(o.match("#")){var t=o.split("#")[1],a=t.replace("c_","");e.set_model(a),$(".panel-collapse").removeClass("in"),$("#"+t).addClass("in")}}]).controller("FeedCtrl",["$scope",function(e){e.reset_search=function(){e.search.$=""},e.role_helper=function(e){var o={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terapeuta",mediator:"Mediador",coordinator:"Coordenador",user:"Estudante"};return o[e]}}]).controller("ExerciciosCtrl",["$scope","$http","$timeout","$interval","Exercicios","Upload",function(e,o,t,a,n,r){n.fetch_all().then(function(o){e.exercicios=o.data},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.resposta={},e.carregando=!1,e.carregando_porcentagem=0,e.reset_search=function(){e.search.$="",e.fechar()},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(o){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=o?o:!1},e.upload=function(o,t){e.carregando=!0,e.carregando_porcentagem=1,e.resposta.id=o,e.resposta.user_id=t,n.add_reply(e.resposta).then(function(o){e.resposta_enviada=!0,e.segundos_restantes=3,a(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(e){alert("Aconteceu um erro ao ser enviado a resposta. Tente novamente.")},function(o){var t=parseInt(100*evt.loaded/evt.total);e.carregando_porcentagem=t})}}]).controller("BatePapoCtrl",["$scope","$http","$timeout","$interval","Mensagens",function(e,o,t,a,n){n.fetch_all().then(function(o){e.mensagens=o.data},function(){alert("Ocorreu um erro ao carregar as mensagens do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.reset_search=function(){e.search.$="",e.fechar()},e.enviar_nova_mensagem=function(o,t,r,s){o={to:o.to,model:t,model_id:r,author:s,content:o.content,name:o.name},n.add_message(o).then(function(o){e.mensagem_enviada=!0,e.segundos_restantes=3,a(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível incluir a mensagem!")})},e.btn_nova_mensagem=function(){e.janela_expandida=!0,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!0},e.enviar_resposta=function(o,t,r,s,i){o={content:o.content,model:r,model_id:s,message_id:t,author:i},e.mensagem_selecionada.replies.push(o),n.add_reply(o).then(function(o){e.resposta_enviada=!0,e.segundos_restantes=3,a(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(){alert("Não foi possível salvar a sua resposta")})},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(o){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=o?o:!1}}]).controller("ListarRegistrosCtrl",["$scope","$http",function(e,o){e.filtro={ano:null,mes:null,aula:null},e.meses=[{nome:"Janeiro",registros:0,numero:1},{nome:"Fevereiro",registros:0,numero:2},{nome:"Março",registros:0,numero:3},{nome:"Abril",registros:0,numero:4},{nome:"Maio",registros:0,numero:5},{nome:"Junho",registros:0,numero:6},{nome:"Julho",registros:0,numero:7},{nome:"Agosto",registros:0,numero:8},{nome:"Setembro",registros:0,numero:9},{nome:"Outubro",registros:0,numero:10},{nome:"Novembro",registros:0,numero:11},{nome:"Dezembro",registros:0,numero:12}],e.meses_registros=[],e.aulas=[],o.post(baseUrl+"registros/api_registros_por_ano").then(function(o){e.aulas=o.data.lessons,e.meses_registros=o.data.meses}),e.reset_search=function(){e.search.$="",e.voltarParaAulas()},e.selecionarAula=function(o){e.filtro.aula=o,$("#listagem-aulas").slideUp(500,function(){$("#listagem-detalhes").slideDown(500)})},e.mudarAno=function(){$("#listagem-detalhes,#listagem-aulas,#listagem-meses").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.getTotalRegistros=function(o){var t=0;return angular.forEach(e.meses_registros,function(e,a){a==o&&(t=e)}),t},e.selecionarMes=function(o){e.filtro.mes=o,$("#listagem-meses").slideUp(500,function(){$("#listagem-aulas").slideDown(500)})},e.voltarParaMeses=function(){$("#listagem-detalhes,#listagem-aulas").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.voltarParaAulas=function(){$("#listagem-detalhes").slideUp(500,function(){e.filtro.aula=null,$("#listagem-aulas").slideDown(500)})}}]).controller("EditarRegistroCtrl",["$scope","Inputs",function(e,o){e.registros=[],e.lesson_id=angular.element("#registros-container").data("id"),o.fetch_all(e.lesson_id).then(function(o){e.registros=o.data.registros,e.campos=o.data.campos})}]).controller("EvolucaoCtrl",["$scope",function(e){}]).controller("AdicionarRegistrosCtrl",["$scope",function(e){}]).controller("AuthenticationController",["$scope",function(e){e.roleChecked=!1,e.roles={"tutors.tutor":"Tutor(a)","schools.mediator":"Mediador(a)","schools.coordinator":"Coordenador(a)","protectors.dad":"Pai","protectors.mom":"Mãe","therapists.therapist":"Terapeuta","users.user":"Aluno(a)"},e.roles_icons={"tutors.tutor":"graduation-cap","schools.mediator":"users","schools.coordinator":"building","protectors.dad":"male","protectors.mom":"female","therapists.therapist":"user-md","users.user":"user"},e.setRole=function(o){e.roleChecked=o},e.getRole=function(){return void 0==e.roles[e.roleChecked]?"Quem é você?":e.roles[e.roleChecked]},e.getRoleIcon=function(){return e.roles_icons[e.roleChecked]},e.clear=function(){e.roleChecked=!1}}]).controller("CmsInputCtrl",["$scope",function(e){e.keyPressed=function(o){console.log(o.which),2==o.which&&e.adicionar_mais()},e.adicionar_mais=function(){e.input.config.options.push(""),setTimeout(function(){$("textarea").last().focus()},0)},e.$watch("input.type",function(o){"escala_texto"==o&&void 0==e.input.config&&(e.input.config={options:[""]})})}]).controller("CmsChartsCtrl",["$scope",function(e){e.$watch("chart",function(o){0==o.chart_inputs.length&&(e.chart.chart_inputs=[""])})}]),angular.module("RedePga").directive("shortcut",function(){return{restrict:"E",replace:!0,scope:!0,link:function(e,o,t){jQuery(document).on("keypress",function(o){e.$apply(e.keyPressed(o))})}}}).directive("selectAluno",function(){return{link:function(e,o,t){$(o).change(function(){$(this).parent().submit()})}}}).directive("selectTwo",function(){return{link:function(e,o,t){$(o).select2()}}}).directive("slimscroll",function(){return{link:function(e,o,t){$(o).slimScroll({height:"480px",alwaysVisible:!0,railVisible:!0,position:"right"})}}}).directive("escolherCampo",function(){return{link:function(e,o,t){o.bind("change",function(){var a=o.find(":selected").data("type"),n=o.find(":selected").data("config"),r=t.indice;e.registros[r].type=a,"escala_numerica"==a?(e.registros[r].value=n.min,e.registros[r].config=n):"escala_texto"==a?(e.registros[r].value=n.options[0],e.registros[r].config=n):e.registros[r].value=null,e.$apply()})}}}).directive("datepicker",function(){return function(e,o,t){$.datepicker.regional["pt-BR"]={closeText:"Fechar",prevText:"&#x3C;Anterior",nextText:"Próximo&#x3E;",currentText:"Hoje",monthNames:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],dayNamesMin:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],weekHeader:"Sm",dateFormat:"dd/mm/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},$.datepicker.setDefaults($.datepicker.regional["pt-BR"]),$(o).datepicker({inline:!0,dateFormat:"dd/mm/yy",changeMonth:!0,changeYear:!0,yearRange:"c-65:c+10"})}}),angular.module("RedePga").factory("Inputs",function(e,o){return{fetch_all:function(o){return e.get(baseUrl+"registros/api_inputs/"+o)}}}).factory("Exercicios",function(e,o){return{add_reply:function(e){return o.upload({url:baseUrl+"exercicios/api_add_reply",data:{anexo:e.attachment,resposta:e}})},fetch_all:function(){return e.get(baseUrl+"Exercicios/api_fetch_all")}}}).factory("Mensagens",function(e){return{add_message:function(o){return e.post("BatePapo/api_add_message",o)},add_reply:function(o){return e.post("BatePapo/api_add_reply",o)},fetch_all:function(){return e.get("BatePapo/api_fetch_all")}}});