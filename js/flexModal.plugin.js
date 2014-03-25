(function ($) {
    $.fn.extend({
        flexModal: function (options) {
            var helpers, modalWindow, setup, close;
            helpers = {
                domEls : {
                    overlay : $("<div id='modal__overlay' class='modal__overlay'></div>"),
                    Container : $('<div id="modal__container" class="modal__container"></div>'),
                    close : $('<a href="#" id="modal__close" class="modal__close">X</a>'),
                    modalContent : $('<div id="modal__content" class="modal__content"></div>'),
                    modalTitle : $('<h3 class="modal__header modal__header--added"></h3>')
                },
                classes : {
                    overlay: 'modal__overlay',
                    container: 'modal__container',
                    close: 'modal__close',
                    content: 'modal__content',
                    header: 'modal__header',
                    iframe: 'modal__content__iframe',
                    hasIframe: 'modal__content--hasIframe'
                },
                idList: {
                    overlay: 'modal__overlay',
                    container: 'modal__container',
                    close: 'modal__close',
                    content: 'modal__content',
                    iframe: 'modal__content__iframe'
                }
            };
            modalWindow = {
                getModalId: function (url) {
                    return (url.indexOf('#') != 0) ? "#" + helpers.idList.container : url;
                },
                getDimensions: function (meta) {
                    var wWidth = $(window).width(),
                        wHeight = $(window).height(),
                        t = (wHeight - (wHeight / 1.618)) / 2,
                        w = wWidth / 1.618,
                        h = wHeight / 1.618,
                        l,
                        modal = {};
                    if (meta.sizing != 'auto' && meta.sizing != undefined) {
                        w = meta.sizing.width != undefined ? meta.sizing.width : w;
                        h = meta.sizing.height != undefined ? meta.sizing.height : h;
                    }
                    /*convert it all to percent so the modal resizes with the window*/
                    w = (w / wWidth) * 100;
                    l = (100 - w) / 2;
                    t = (t / wHeight) * 100;
                    modal = {
                        width:  w,
                        height: h,
                        top :  meta.top != undefined && meta.top != "auto" ? (meta.top / wHeight) * 100 : t,
                        left : l
                    };
                    return modal;
                },
                setIframe: function (metadata, href) {
                    var modal_id = $('#' + helpers.idList.container),
                        iframe = $('<iframe id="' + helpers.idList.iframe + '" class="' + helpers.classes.iframe + '"></iframe>'),
                        iframeHeight;
                    $(iframe).attr('src', href);
                    if (typeof metadata.iframe === 'object') {
                        $(iframe).attr(metadata.iframe);
                    }
                    if (typeof metadata.iframe.css === 'object') {
                        $(iframe).css(metadata.iframe.css);
                    }
                    $(modal_id).find('.' + helpers.classes.content).addClass('modal__content--hasIframe').append(iframe);
                    if (metadata.iframe.height != undefined) {
                        iframeHeight = metadata.iframe.height != undefined ? metadata.iframe.height : metadata.iframe.css.height;
                        iframeHeight += 20;
                    } else {
                        iframeHeight = "95%";
                        $(modal_id).find('.' + helpers.classes.content + ' iframe').css({
                            height: iframeHeight
                        });
                    }
                    $(modal_id).find('.' + helpers.classes.content).css({
                        height: iframeHeight
                    });
                },
                showOverlay: function (meta) {
                    var overlay = meta.overlay != undefined ? meta.overlay : 0.5;
                    $('#' + helpers.idList.overlay).css({'display' : 'block', opacity : 0 }).attr('data-referrer', meta.referrer);
                    $('#' + helpers.idList.overlay).fadeTo(200, overlay);
                },
                setModalCSS: function (modal_id, meta) {
                    var modal = modalWindow.getDimensions(meta);
                    $(modal_id).css({
                        'display' : 'block',
                        'position' : 'fixed',
                        'opacity' : 0,
                        'z-index': 9999,
                        'left' : modal.left + '%',
                        'width' : modal.width + "%",
                        'top' : modal.top + "%",
                        'overflow' : 'visible'
                    });
                    if (meta.css != undefined) {
                        $(modal_id).css(meta.css);
                    }
                },
                setModalContentHeight: function (modal_id, meta) {
                    var modal = modalWindow.getDimensions(meta),
                        titleHeight = $(modal_id).find('.' + helpers.classes.header).height(),
                        contentHeight = modal.height - titleHeight,
                        unit = typeof (modal.height) != 'number' ? '' : 'px';
                    if (meta.iframe != undefined) {
                        contentHeight = contentHeight < meta.iframe.height ? meta.iframe.height : contentHeight;
                        contentHeight = parseInt(contentHeight, 10);
                        contentHeight += 20;
                    }
                    $(modal_id).find('.' + helpers.classes.content).css({
                        'height': contentHeight + unit
                    });
                },
                addCloseButton: function (modal_id, meta) {
                    if ($(modal_id).find('.' + helpers.classes.close).index() == -1) {
                        if (meta.closebutton != 'undefined' && meta.closebutton != 'false') {
                            $(helpers.domEls.close).attr('data-referrer', meta.referrer);
                            $(modal_id).prepend(helpers.domEls.close);
                        }
                    }
                    $(modal_id).on('click',  close.init);
                },
                addModalTitle: function (modal_id, meta) {
                    if (meta.title != 'undefined') {
                        var title = meta.title;
                        if ($(modal_id).find('.' + helpers.classes.header).index() != -1) {
                            $(modal_id).find('.' + helpers.classes.header).html(title);
                        } else {
                            title = $(helpers.domEls.modalTitle).html(title);
                            $(modal_id).find('.' + helpers.classes.content).before(title);
                        }
                    }
                },
                showModal: function (metadata) {
                    $(metadata.modal_id).fadeTo(200, 1);
                    $(metadata.modal_id).attr('data-referrer', metadata.referrer).addClass('modal__container');
                }
            };
            close = {
                init: function (e) {
                    var _this = close,
                        modalReference = $(e.target).attr('data-referrer');
                    _this.closeOverlay();
                    _this.hideContainer();
                    _this.cleanContainer(modalReference);
                    _this.hideModalTrigger();
                },
                helpers:  {
                    clearClasses: function (modalReference) {
                        $('.' + helpers.classes.hasIframe).removeClass('modal__content--hasIframe');
                        $('.modal__container, [data-referrer="modal_id"]').removeAttr("style");
                        $('[data-referrer="' + modalReference + '"].modal__container').removeClass(helpers.classes.container);

                    },
                    clearContent: function () {
                        var domEls = helpers.domEls;
                        $(domEls.modalContent).html('');
                        $('.' + helpers.classes.iframe).remove();
                        $('.' + helpers.classes.close).remove();
                        $('#modal__container .modal__header--added').remove();
                    }
                },
                closeOverlay: function () {
                    $('#' + helpers.idList.overlay).fadeOut(200);
                },
                hideModalTrigger: function () {
                    if (window.modalTrigger !== undefined) {
                        var modalTrigger = '[data-modal="' + window.modalTrigger + '"]';
                        $(modalTrigger).parent().fadeOut(400, 'linear');
                    }
                },
                hideContainer: function () {
                    var $container = $('#' + helpers.idList.container),
                        $containerFrames = $container.find('iframe');
                    $container.hide("fast");
                    if ($containerFrames.length > 0) {
                        $containerFrames.each(function () {
                            var src = $(this).attr('src');
                            $(this).attr('src', '').attr('src', src);
                        });
                    }
                },
                cleanContainer: function (modalReference) {
                    close.helpers.clearClasses(modalReference);
                    close.helpers.clearContent();
                }
            };
            setup = {
                init: function (metadata) {
                    this.addModal();
                    this.addOverlay(metadata);
                },
                addModal: function () {
                    var domEls = helpers.domEls;
                    if ($('#' + helpers.idList.container).index() == -1) {
                        $(domEls.Container).append(domEls.modalContent);
                        $(domEls.Container).prepend(domEls.close);
                        $("body").append(domEls.Container);
                    }
                },
                addOverlay: function (metadata) {
                    var overlay = helpers.domEls.overlay;
                    if ($('.' + helpers.classes.overlay).index() == -1) {
                        $("body").append(overlay);
                    }
                    $('.' + helpers.classes.overlay).on('click',close.init);
                },
                launchModal: function (el, metadata) {
                    var href = $(el).attr('href') != undefined ? $(el).attr('href') : metadata.src,
                        modal_id = metadata.src != undefined ? modalWindow.getModalId(metadata.src) : modalWindow.getModalId($(el).attr('href'));
                    metadata.modal_id = modal_id;
                    modalWindow.addCloseButton(modal_id, metadata);
                    modalWindow.addModalTitle(modal_id, metadata);
                    if (metadata.iframe && metadata.iframe !== false) {
                        modalWindow.setIframe(metadata, href);
                    }
                    modalWindow.showOverlay(metadata);
                    modalWindow.setModalCSS(modal_id, metadata);
                    modalWindow.setModalContentHeight(modal_id, metadata);
                    modalWindow.showModal(metadata);
                    if (metadata.hideTrigger == "true") {
                        window.modalTrigger = $(el).attr('data-modal');
                    }
                }
            };
            $(this).each(function (i, el) {
                if ($(el).attr('id') == null) {
                    $(el).attr('id', 'flexModal-' + i);
                }
                var metadata = !$(el).data('modal') ? {iframe: true} : $(el).data('modal'),
                    attrs = document.getElementById($(el).attr('id')).attributes,
                    l = attrs.length,
                    modalEventTrigger = options !== undefined && options.trigger !== undefined ? options.trigger : 'click',
                    attr,
                    elName;
                for (i = 0; i < l; i++) {
                    attr = attrs.item(i);
                    if (attr.nodeName.match('data-modal-')) {
                        elName = attr.nodeName.replace('data-modal-', '');
                        metadata[elName] = attr.nodeValue;
                    }
                }
                metadata.referrer = $(el).attr('id');
                jQuery.extend(metadata, options);
                setup.init(metadata);
                if (modalEventTrigger !== 'query') {
                    $(el).on(modalEventTrigger, function (e) {
                        e.preventDefault();
                        setup.launchModal($(el), metadata);
                    });
                } else {
                    metadata.iframe = false;
                    setup.launchModal($(el), metadata);
                }
            });
        }
    });
}(jQuery));