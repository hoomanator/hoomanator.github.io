import $ from "jquery";
declare let global: any;
global.jQuery = $;

$('#buttonId').on('click', ()=>{
 const myHTML: string = `
              <b>
                This text is shown using
                the jQuery in TypeScript 
                by installing it using 
                npm package.
              </b>`;
    $('#dialog-container').html(myHTML);
});

