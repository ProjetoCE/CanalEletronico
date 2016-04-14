/*!
 * EChannel v1.0 beta
 * jquery.echannel-1.0-beta.js
 * Abr-2016
 *
 * Funções específicas para a aplicação EChannel (Canal Eletrônico).
 *
 */

/*!
 * Dependências:
 * JQuery 1.* - http://jquery.com/
 * Bootstrap 3.* - http://getbootstrap.com/
 *
 */

 /*!
  * Importante:
  * Esta versão da aplicação foi projetada exclusivamente para testes
  * em navegadores utilizando definições de tela análogas à de dispositivos
  * de telefonia móvel (smartphones).
  *
  */

/* ========================================================================
 * EChannel: funções para exibição de alertas
 * ======================================================================== */
+function($) {

    /**
     * Exibe caixa de alerta ao usuário.
     * @param ct Conteúdo a ser projetado [texto plano ou html]
     * @param ct Identificador do alerta.
     * @param bg Configuração cromática da caixa de alerta [Bootstrap, css, alert]
     * @param sz Configuração dimensional da caixa de alerta [Bootstap, js, modal]
     * @return false
     */

    $.fn.warning = function(ct, id, bg, sz) {
        //validar definição de conteúdo
        if (ct == undefined) return false;

        /**
         * Definição de parâmetros em variáveis.
         */
        var ct = ct;
        var id = (id != undefined && id != 0)? id : 'waring-default';
        var bg = (bg != undefined && bg != 0)? bg : 'alert-danger';
        var sz = (sz != undefined && sz != 0)? sz : '';

        /**
         * Definição de caixa de alerta.
         */
        var md = '\
            <div id="'+id+'" class="modal fade warning-modal" tabindex="-1" role="dialog">\
                <div class="modal-dialog '+sz+' alert '+bg+' alert-dismissible fade in" role="alert">\
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                        <span aria-hidden="true">×</span>\
                    </button>\
                    '+ct+'\
                </div>\
            </div>';

        //ocultar caixas previamente exibidas
        $.fn.warningClose();

        //incluir caixa de alerta no documento
        $('body').append(md);

        //exibir caixa de alerta
        $('body').find('#'+id).modal('show');

        //excluir caixa de alerta ao ocultá-la
        $('#'+id).on('hidden.bs.modal', function() {
            $(this).remove();
        });

        return false;
    };

    /**
     * Fecha caixas de diálogo abertas.
     */
    $.fn.warningClose = function() {
        //detectar caixas de alerta
        $('body').find('.warning-modal').each(function(){

            //ocultar caixa de alerta
            $(this).modal('hide');

            //excluir caixa de alerta ao ocultá-la
            $(this).on('hidden.bs.modal', function() {
                $(this).remove();
            });

        });

        return false;
    }

}(jQuery);

/* ========================================================================
 * EChannel: funções para controle de dimensionamento de tela
 * ======================================================================== */
+function($) {

    /**
     * Verifica dimensões atuais da tela.
     */
    $.fn.displayScan = function() {
        //verificar exibição anterior
        if ($('body').attr('data-war') == 'display') return false;

        /**
         * Indicador de exibição prévia de alerta.
         */
        var war = $('body').find('#warning-display').length;

        /**
         * Largura da tela.
         */
        var wdt = $(window).width();

        /**
         * Conteúdo do alerta.
         */
        var ct = $('#resource-warning-screen').html();

        if (wdt > 640 && war == 0) {
            //exibir alerta para dimensões amplas
            $.fn.warning(ct);

            //registrar exibição de alerta
            $('body').attr('data-war', 'display');

            return false;
        }
        else {
            //ocultar alerta para dimensões reduzidas
            if (wdt < 640 && war > 0) $.fn.warningClose();

            return false;
        }

    };

    /**
     * Ativa verificação ao alterar dimensões de tela.
     */
    $(window).on('resize', function() {
        $.fn.displayScan();
    });

    /**
     * Aplicações inicais.
     */
    $(document).ready(function() {
        /**
         * Ativa verificação ao carregar a página.
         */
        if ($(window).width() > 640) $.fn.displayScan();

        /**
        * Ajusta dimensões de tela.
        */
        $('body').on('click', '.screen-adjust', function(e) {
           e.preventDefault();

           //abrir nova janela com dimensões ajustadas
           window.open('index.html', '', 'width=320, height=520');

           //fechar alerta
           $.fn.warningClose();

           return false;
        });
    })

}(jQuery);

/* ========================================================================
 * EChannel: funções para controle de blocos
 * ======================================================================== */
+function($) {

   /**
    * Avança para o próximo bloco.
    */
   $.fn.blockNext = function() {

     /**
      * Contadores e identificadores de blocos.
      */
     var dataOut    = parseInt($('#container-main').attr('data-view'));
     var dataIn     = dataOut + 1;
     var dataLen    = $('#container-main').find('.container-block').length;

     /**
      * Bloco removido.
      */
     var blockOut  = $('body').find('.container-block[data-block='+dataOut+']');


     //submeter formulário de bloco atual
     if (blockOut.attr('data-validate') == 'form') {
         var validate = blockOut.checkForm();
         if (validate == false) return false;
     }

     //verificar nível de avanço
     if (blockOut.attr('id') == 'block-feature') {
         dataIn += blockOut.checkNext();
     }

     /**
      * Bloco exibido.
      */
     var blockIn   = $('body').find('.container-block[data-block='+dataIn+']');

     //atualizar bloco exibido
     $('#container-main').attr('data-view', dataIn);

     //ocultar botão de avanço em bloco de captcha
     if (dataLen - dataIn == 2) $('#btn-next').hide();

     if (dataLen - dataIn == 1) {
         //ocultar botão de regresso em bloco final
         $('#btn-prev').hide();
     }
     else {
         //exibir botão de regresso
         $('#btn-prev').show();
     }

     //ocultar bloco atual
     blockOut
         .animate({
           opacity: 0.5,
           left: "-100%",
         }, 200, function(){
           $(this)
             .removeClass('current')
             .css('display', 'none');
           $(this).find('.info-alert').hide();
         });

     //exibir ptóximo bloco
     blockIn
       .css('display', 'block')
       .css('left', '100%')
       .attr('data-prev', dataOut)
       .animate({
           opacity: 1,
           left: "0%",
        }, 200, function(){
            $(this).addClass('current');
        });

     return false;
   };

   /**
    * Avança para a tela anterior.
    */
    $.fn.blockPrev = function() {

        /**
        * Contadores e identificadores de blocos.
        */
        var dataOut = parseInt($('#container-main').attr('data-view'));
        var dataLen = $('#container-main').find('.container-block').length;

        /**
        * Bloco removido.
        */
        var blockOut  = $('body').find('.container-block[data-block='+dataOut+']');

        /**
        * Bloco incluído.
        */
        var dataIn    = parseInt(blockOut.attr('data-prev'));
        var blockIn   = $('body').find('.container-block[data-block='+dataIn+']');

        //ocultar botão de avanço em bloco de captcha
        if (dataIn == 0) $('#btn-prev').hide();

        //ocultar botão de regresso em bloco final
        if (dataLen - dataIn > 2) $('#btn-next').show();

        //atualizar bloco exibido
        $('#container-main').attr('data-view', dataIn);

        $('body').find('.warning-modal').remove();

        //ocultar bloco atual
        blockOut
            .animate({
                opacity: 0.5,
                left: "100%",
            }, 200, function(){
                $(this)
                    .removeClass('current')
                    .css('display', 'none');

            });

        //exibir ptóximo bloco
        blockIn
            .css('display', 'block')
            .css('left', '-100%')
            .animate({
                opacity: 1,
                left: "0%",
            }, 200, function(){
                $(this).addClass('current');
            });

        return false;
    };

    /**
    * Validação de e-mail.
    */
    $.fn.checkEmail = function () {
        var result = true;

        $(this).find(':input').each(function(){

          var str = $(this).val();
          var len = str.length;
          var at  = str.indexOf('@');
          var dot = str.indexOf('.');

          if (at < 1 || dot < 1) result = false;
          if ((len - 2) < at || (len - 2) < dot) result = false;

        });

        return result;
    }

    /**
    * Validação de input.
    */
    $.fn.checkInput = function () {
        var result = true;

        $(this).find(':input').each(function(){

          var val = $(this).val();

          if (val == '') result = false;

        });

        return result;
    }

    /**
    * Validação de radio.
    */
    $.fn.checkRadio = function () {
        var result  = false;

        $(this).find(':input').each(function(){
          if ($(this).is( ":checked" )) result = true;
        });

        return result;
    }

    /**
    * Validação de select.
    */
    $.fn.checkSelect = function () {
        var result  = true;

        $(this).find('select').each(function(){
          if ($(this).find('option:selected').attr('value') == null) result = false;
        });

        return result;
    }

    /**
    * Validação de campos de formulário.
    */
    $.fn.checkForm = function() {

        var input       = $(this).find('.required');
        var validate    = input.attr('data-validate');

        switch (validate) {
            case 'email':
                var res = input.checkEmail();
                if (res == false) {
                    $.fn.warning('Inclua um endereço de email válido');
                    return false;
                }
                break;
            case 'input':
                var res = input.checkInput()
                if (res == false) {
                    $.fn.warning('Preencha o campo de informações.');
                    return false;
                }
                break;
            case 'radio':
                var res = input.checkRadio();
                if (res == false) {
                    $.fn.warning('Selecione, ao menos, uma das opções.');
                    return false;
                }
                break;
            case 'select':
                var res = input.checkSelect();
                if (res == false) {
                    $.fn.warning('Selecione, ao menos, uma das opções.');
                    return false;
                }
                break;
            default:
                return true;
        }

        /**
        * Verificação de avanço de bloco.
        */
        $.fn.checkNext = function() {
          var checked = $(this).find(':checked').attr('value');

          if (parseInt(checked) == 0) {
              return 1;
          }
          else {
              return 0;
          }
        };

    }

    /**
     * Aplicações inicais.
     */
    $(document).ready(function() {

        /**
         * Avança para a tela posterior.
         */
        $('body').on('click', '#btn-next', function(e){
            e.preventDefault();
            $.fn.blockNext();
            return false
        });

        /**
         * Avança para a tela anterior.
         */
        $('body').on('click', '#btn-prev', function(e){
            e.preventDefault();
            $.fn.blockPrev();
            return false
        });

    });

}(jQuery);

/* ========================================================================
 * EChannel: funções para controle de idiomas.
 * ======================================================================== */
+function($) {

   /**
    * Altera configurações de idioma.
    * @param lang Idioma a ser exibido
    */
   $.fn.langToggle = function(lang) {
       //definir variáveis
       switch (lang) {
           case 'lang-pt':
               var langShow = 'pt';
               var langHide = 'en';
               break;
           case 'lang-en':
               var langShow = 'en';
               var langHide = 'pt';
               break;
       }

       //ocultar idioma definido
       $('body').find('[data-lang='+langHide+']').each(function() {
           $(this).hide();
       });

       //exibir idioma definido
       $('body').find('[data-lang='+langShow+']').each(function() {
           $(this).show();
       });

       //remover destaque de botão
       $('body').find('[data-langbtn='+langHide+']').each(function() {
           $(this).css({color:'#777777', opacity:'0.6'});
       });

       //exibir destaque de botão
       $('body').find('[data-langbtn='+langShow+']').each(function() {
           $(this).css({color:'#ff9900', opacity:'inherit'});
       });

       return false;
   }

   /**
    * Aplicações inicais.
    */
   $(document).ready(function() {

       /**
        * Configurações inicais de idioma.
        */
       $.fn.langToggle('lang-pt');

       /**
        * Ativa alteração de configurações de idioma.
        */
       $('body').on('click', '.btn-lang', function(e) {
           e.preventDefault();

           var lang = $(this).attr('id');
           $.fn.langToggle(lang);

           return false;
       });

   });

}(jQuery);

/* ========================================================================
 * EChannel: funções para controle de campos.
 * ======================================================================== */
+function($) {

    /**
     * Verificação de texto de segurança.
     */
    $.fn.checkCaptcha = function () {

        var input = $('#captcha-input').val().toLowerCase();

        //texto vazio
        if (input == '') {
            $.fn.warning('Digite o texto da imagem.');

            return false;
        }

        //texto incorreto
        if (input != '6gpz8jh') {
            $.fn.warning('O texto digitado não corresponde ao da imagem.');

            return false;
        }

        return true;
    }

    /**
     * Aplicações inicais.
     */
    $(document).ready(function() {

        /**
         * Destaque de opções de botões radio.
         */
        $('body').on('change', ':radio', function() {

            //detectar opções de destaque
            $(this).parents('.form-group').find(':radio').each(function() {

                if ($(this).prop('checked')) {
                    $(this).parents('label').addClass('checked');
                }
                else {
                    $(this).parents('label').removeClass('checked');
                }

            });

            return false;
        });

        /**
         * Exibição de informações em select.
         */
        $('body').on('change', '#tip-field', function(e) {
            e.preventDefault();

            /**
             * Identificação de elementos.
             */
            var mainBlock = $('#block-field');
            var infoBlock = mainBlock.find('.info-block');
            var infoId    = $(this).find('option:selected').val();
            var infoRepo  = mainBlock.find('.info-repo[data-id='+infoId+']');

            //remover bloco informativo anterior
            infoBlock.empty();

            //exibir bloco informativo selecionado
            if (infoRepo != undefined) $(infoRepo).clone().appendTo(infoBlock);

            return false;
        });

        /**
         * Exibição de informações em select.
         */
        $('body').on('click', '#btn-submit', function(e) {
            e.preventDefault();

            /**
             * Identificação de elementos.
             */
            var currBlock = $('body').find('.container-block.current');

            //verificar texto de segurança
            if (currBlock.checkCaptcha() == false) return false;

            //avançar bloco
            $.fn.blockNext();

            $('#btn-next').hide();
            $('#btn-prev').hide();

            return false;
        });

    });

}(jQuery);
