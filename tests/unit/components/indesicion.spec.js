import { shallowMount } from "@vue/test-utils"
import Indecision from "@/components/Indecision"

describe('Indecision component snapshot', () => {
     let wrapper;
     let clgSpy;

     //Evitar error de fetch
     global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve({

               "answer": "yes",
               "forced": false,
               "image": "https://yesno.wtf/assets/yes/5-64c2804cc48057b94fd0b3eaf323d92c.gif"

          })
     }));

     beforeEach(() => {
          wrapper = shallowMount(Indecision);
          //Esta pendiente una accion en algun elemento del componente en este cao de cuantas veces se ejecuta el console log de watch
          clgSpy = jest.spyOn(console, 'log');

          jest.clearAllMocks();
     });

     test('Debe hacer match con el snapshot', () => {
          expect(wrapper.html()).toMatchSnapshot();
     })

     test('Escribir en el input no debe disparar nada (console.log)', async () => {

          //Obtener un metodo definido en methods en el componente de vue
          const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

          //Obtiene el input
          const input = wrapper.find('input');

          //Asigna un valor
          await input.setValue('Algun valor');

          //Cuantas veces se espera que se ejecute en este caso el metodo watch la parte de console.log
          expect(clgSpy).toHaveBeenCalledTimes(1);

          //Se espera que el metodo no ha sido ejectuado por que el texto no conteien el signo de interrogacion
          expect(getAnswerSpy).not.toHaveBeenCalled();
     })

     test('Escribir en el input el simbolo de "?" para disparar el metodo getAnswer', async () => {

          //Obtener un metodo definido en methods en el componente de vue
          const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

          //Obtiene el input
          const input = wrapper.find('input');

          //Asigna un valor
          await input.setValue('Va a llover?');

          //Se espera que el metodo no ha sido ejectuado por que el texto no conteien el signo de interrogacion
          expect(getAnswerSpy).toHaveBeenCalled();
     })

     test('Pruebas en getAnswer', async () => {
          await wrapper.vm.getAnswer();

          const img = wrapper.find('img');

          expect(img.exists()).toBeTruthy();

          expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/5-64c2804cc48057b94fd0b3eaf323d92c.gif');

          expect(wrapper.vm.answer).toBe('Si');
     })

     test('Pruebas en getAnswer - Fallo en API', async () => {

          fetch.mockImplementationOnce(() => Promise.reject('API is Down'));

          await wrapper.vm.getAnswer();

          const img = wrapper.find('img');

          expect(img.exists()).toBeFalsy();

          expect(wrapper.vm.answer).toBe('Error al cargar');
     })
})