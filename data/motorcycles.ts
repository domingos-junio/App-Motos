export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  cilindrada: string;
  potencia: string;
  velocidadeMax: string;
  peso: string;
  tecnologia: string;
  brandColor: string;
  description: string;
  imageUrl: string;
}

export const motorcycles: Motorcycle[] = [
  {
    id: '1',
    name: 'Kawasaki Ninja ZX-10R',
    brand: 'Kawasaki',
    cilindrada: '998cc',
    potencia: '203 HP',
    velocidadeMax: '299 km/h',
    peso: '207 kg',
    tecnologia: 'KTRC / KIBS / KLCM',
    brandColor: '#66CC33',
    description: 'A Kawasaki Ninja ZX-10R é uma das supersport mais vitoriosas do WorldSBK. Equipada com sistema de controle de tração KTRC, freios inteligentes KIBS e controle de largada KLCM, ela entrega 203 cavalos de pura potência japonesa. Seu motor de 998cc com 4 cilindros em linha é afinado para performance tanto em pista quanto na rua.',
    imageUrl: 'https://cdn.abacus.ai/images/be93bec2-37bc-4bbc-9437-1b180bd00325.png',
  },
  {
    id: '2',
    name: 'Yamaha YZF-R1',
    brand: 'Yamaha',
    cilindrada: '998cc',
    potencia: '200 HP',
    velocidadeMax: '299 km/h',
    peso: '201 kg',
    tecnologia: 'Crossplane CP4 / IMU',
    brandColor: '#0033CC',
    description: 'A Yamaha YZF-R1 é uma lenda das pistas, com seu inovador motor crossplane de 4 cilindros que proporciona uma entrega de torque linear e previsível. Com 200 cavalos e tecnologia derivada da MotoGP, incluindo unidade de medição inercial (IMU), a R1 é a referência em feeling de pilotagem.',
    imageUrl: 'https://cdn.abacus.ai/images/07eded90-6a37-444f-a8c8-8c0ef3b1f381.png',
  },
  {
    id: '3',
    name: 'Suzuki GSX-R1000R',
    brand: 'Suzuki',
    cilindrada: '999cc',
    potencia: '202 HP',
    velocidadeMax: '299 km/h',
    peso: '203 kg',
    tecnologia: 'S-DMS / Motion Track',
    brandColor: '#FFD700',
    description: 'A Suzuki GSX-R1000R combina tradição com inovação. O Suzuki Drive Mode Selector (S-DMS) permite personalizar a resposta do acelerador, enquanto o sistema Motion Track Brake monitora a dinâmica da moto em tempo real. Com 202 cavalos e DNA herdado da MotoGP, é uma máquina precisa e confiável.',
    imageUrl: 'https://cdn.abacus.ai/images/694b73e4-6bde-47c2-b1c3-b64b8600a6f3.png',
  },
  {
    id: '4',
    name: 'Honda CBR1000RR-R Fireblade',
    brand: 'Honda',
    cilindrada: '1000cc',
    potencia: '217 HP',
    velocidadeMax: '299 km/h',
    peso: '201 kg',
    tecnologia: 'Öhlins Semi-Ativa / Winglets',
    brandColor: '#CC0000',
    description: 'A Honda CBR1000RR-R Fireblade SP é a superbike mais potente da Honda, com 217 cavalos extraídos de um motor derivado da RC213V de MotoGP. Suspensão semi-ativa Öhlins, winglets aerodinâmicos e eletrônica de última geração fazem desta moto uma verdadeira arma de pista homologada para as ruas.',
    imageUrl: 'https://cdn.abacus.ai/images/07d80c6a-3299-4348-89c0-d0e4737b8794.png',
  },
  {
    id: '5',
    name: 'Ducati Panigale V4',
    brand: 'Ducati',
    cilindrada: '1103cc',
    potencia: '215 HP',
    velocidadeMax: '305 km/h',
    peso: '198 kg',
    tecnologia: 'Desmosedici Stradale / Aero',
    brandColor: '#CC0000',
    description: 'A Ducati Panigale V4 é a expressão máxima da engenharia italiana de motocicletas. Com seu motor Desmosedici Stradale V4 de 1103cc derivado diretamente da MotoGP, entrega 215 cavalos com um som inconfundível. Pacote aerodinâmico com winglets, chassi monocoque de alumínio e eletrônica Bosch fazem dela uma referência absoluta.',
    imageUrl: 'https://cdn.abacus.ai/images/906e304e-1724-4c93-9e43-15046bf9f953.png',
  },
];
