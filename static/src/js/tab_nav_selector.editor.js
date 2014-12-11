(function () {
    'use strict';

    var website = openerp.website;

    website.snippet.animationRegistry.js_navbar = website.snippet.Animation.extend({
        selector: ".js_navbar",
        start: function (editable_mode) {
            [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
                new tab_nav_selector(el);
            });
        }
    });

    website.snippet.options.nav_bar_snippet = website.snippet.Option.extend({
        unique_id: function () {
            var id = 0;
            $(".carousel").each(function () {
                var cid = 1 + parseInt($(this).attr("id").replace(/[^0123456789]/g, ''),10);
                if (id < cid) id = cid;
            });
            return "myCarousel" + id;
        },
        drop_and_build_snippet: function() {
            this.id = this.unique_id();
            this.$target.attr("id", this.id);
            console.log('##drag and drop##');

        },
        on_clone: function ($clone) {
            var id = this.unique_id();
            $clone.attr("id", id);
            $clone.find("[data-slide]").attr("href", "#" + id);
            $clone.find("[data-slide-to]").attr("data-target", "#" + id);
        },
        // rebind event to active carousel on edit mode
        rebind_event: function () {
            var self = this;
            $('nav-tabs').off('click').on('click', function () {
                self.$target.tab(+$(this).data('slide-to')); });

            this.$target.attr('contentEditable', 'false');
            this.$target.find('.oe_structure, .content>.row, [data-slide]').attr('contentEditable', 'true');
        },
        clean_for_save: function () {
            this._super();

        },
        start : function () {
            var self = this;
            this._super();
            this.id = this.$target.attr("id");
            console.log('##start##');
            this.$el.find(".js_add_tab").on('click', function () {self.on_add_tab(); return false;});
            this.$el.find(".js_remove_tab").on('click', function () {self.on_remove_tab(); return false;});
            this.rebind_event();
        },
        on_add_tab: function () {
            var self = this;
            var $active = $('.tab-content');
            var $copy_content = $('.content-current section');
            var index = $active.index();
            var $clone = $copy_content.clone();
            $active.append("<div class='tab-pane oe_structure' id='"+this.id+"'><section class='oe_dark mt16 mb16'><div class='container'><div class='col-md-12 text-center mt32 mb32'><h2>A Punchy Headline</h2></div><div class='col-md-12'><img class='img img-responsive' src='/website/static/src/img/big_picture.png' style='margin: 0 auto;'></div><div class='col-md-6 col-md-offset-3 mb16 mt16'><p class='text-center'><b>A Small Subtitle</b></p><p class='text-center'>Choose a vibrant image and write an inspiring paragraph about it. It does not have to be long, but it should reinforce your image.</p><p class='text-center'><a href='/page/website.contactus'>Contact us »</a></p></div></div></div></section></div>");
            console.log(this.id);
            console.log(('.tab-pane #'+this.id+''));
            console.log('##on add##');
            $('nav #myNav').append('<li><a data-cke-saved-href=#'+this.id+' href=#'+this.id+' class="no-animate-link text-center" role="tab" data-toggle="tab"><span><i class="fa fa-home" />Info_new</span></li>').removeClass('active');
            this.rebind_event();
            [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
                new tab_nav_selector(el);
                    });
        },
        on_remove_tab: function () {

            var self = this;
            var new_index = 0;
            var cycle = $('#myNav li').length - 1;

            if (cycle > 0) {

                $('.tab-content .content-current').remove();
                $('#myNav .tab-current').remove();
            } else {

            }
            [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
                new tab_nav_selector(el);
                    });
        }
    });
})();