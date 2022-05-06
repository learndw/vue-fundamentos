import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter"

//captura la estructura del template al momento si se modifica y hay que actualizarse se ejecuta el comando npm run test:unit -u 
describe('Counter Component', () => {

    //Instanciar el componente
    let wrapper;

    //Esta funcion instancia el componente antes de iniciar cada test es decir que el componente se inicia al empezar un nuevo test
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });
    /* test('debe  hacer match con el snapshop', () => { 
        const wrapper=shallowMount(Counter);
        
        expect(wrapper.html()).toMatchSnapshot();
    }) */

    test('El valor por defecto de la etiqueta h1 tiene que ser Defecto', () => {


        //Comprueba si la etiqueta h1 existe
        expect(wrapper.find('h1').exists()).toBeTruthy();

        //Obtiene el valor de la h1
        const h1Value = wrapper.find('h1').text();

        //Comprueba que el valor sea el correcto
        expect(h1Value).toBe('Defecto');

    })


    test('El valor por defecto de la etiqueta h1 tiene que ser Defecto', () => {


        //const p = wrapper.findAll('p').at(1)
        //expect(p.text()).toBe('2')

        const value = wrapper.find('[data-testid="counter"]').text();

        expect(value).toBe('2');

    })

    test('Debe incrementar en 2 el valor del contador y disminuir en 3 el valor', async () => {

        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');

        const value = wrapper.find('[data-testid="counter"]').text();

        expect(value).toBe('1');


    })

    test('Debe establecer el valor por defecto del prop start', () => {
        const { start } = wrapper.props();

        const value = wrapper.find('[data-testid="start"]').text();

        expect(Number(value)).toBe(start);

    })

    test('Debe mostrar la prop por defecto', () => {
        const title = 'Titulo por defecto';

        const wrapper = shallowMount(Counter, {
            props: {
                title
            }
        });

        expect(wrapper.find('h1').text()).toBe(title);
    })
})