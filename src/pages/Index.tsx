import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface DonateItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'privilege' | 'case' | 'item' | 'currency';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  benefits?: string[];
}

const donateItems: DonateItem[] = [
  {
    id: '1',
    name: 'VIP',
    description: 'Базовая привилегия для комфортной игры',
    price: 199,
    type: 'privilege',
    rarity: 'rare',
    benefits: ['Цветной ник', 'Приват 10 регионов', '/fly на 30 минут', 'Доступ к /kit vip']
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Продвинутая привилегия с эксклюзивными возможностями',
    price: 499,
    type: 'privilege',
    rarity: 'epic',
    benefits: ['Все из VIP', 'Приват 25 регионов', '/fly без ограничений', 'Уникальный префикс', '/tp к игрокам']
  },
  {
    id: '3',
    name: 'Legend',
    description: 'Легендарная привилегия для настоящих фанатов',
    price: 999,
    type: 'privilege',
    rarity: 'legendary',
    benefits: ['Все из Premium', 'Приват 50 регионов', 'Создание варпов', 'Цветные таблички', 'Эксклюзивные питомцы']
  },
  {
    id: '4',
    name: 'Алмазный кейс',
    description: 'Шанс получить редкие предметы и ресурсы',
    price: 299,
    type: 'case',
    rarity: 'epic'
  },
  {
    id: '5',
    name: 'Незеритовый кейс',
    description: 'Эксклюзивный кейс с легендарными наградами',
    price: 599,
    type: 'case',
    rarity: 'legendary'
  },
  {
    id: '6',
    name: 'Набор ресурсов',
    description: '64 алмаза, 128 золота, 256 железа',
    price: 149,
    type: 'item',
    rarity: 'rare'
  },
  {
    id: '7',
    name: 'Игровая валюта',
    description: '1000 монет для покупок на сервере',
    price: 99,
    type: 'currency',
    rarity: 'common'
  },
  {
    id: '8',
    name: 'Мега валюта',
    description: '5000 монет + 10% бонус',
    price: 449,
    type: 'currency',
    rarity: 'rare'
  }
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500'
};

const typeIcons = {
  privilege: 'Crown',
  case: 'Package',
  item: 'Sword',
  currency: 'Coins'
};

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<DonateItem | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [balance] = useState(1250);
  const [nickname] = useState('Steve');

  const handlePurchase = (item: DonateItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-border bg-card minecraft-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary flex items-center justify-center minecraft-shadow">
                <Icon name="Pickaxe" className="text-primary-foreground" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MineCraft Donate</h1>
                <p className="text-sm text-muted-foreground">Магазин донатов</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded minecraft-shadow">
                <Icon name="Coins" className="text-primary" size={20} />
                <span className="font-bold text-foreground">{balance} ₽</span>
              </div>
              <Button 
                onClick={() => setShowProfile(!showProfile)}
                className="minecraft-shadow hover-lift"
              >
                <Icon name="User" className="mr-2" size={18} />
                {nickname}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-foreground">Магазин донатов</h2>
          <p className="text-muted-foreground">Выбери привилегии, кейсы и предметы для улучшения игры</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 minecraft-shadow">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="privilege">Привилегии</TabsTrigger>
            <TabsTrigger value="case">Кейсы</TabsTrigger>
            <TabsTrigger value="item">Предметы</TabsTrigger>
            <TabsTrigger value="currency">Валюта</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {donateItems.map((item) => (
                <DonateCard key={item.id} item={item} onPurchase={handlePurchase} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="privilege" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donateItems.filter(i => i.type === 'privilege').map((item) => (
                <DonateCard key={item.id} item={item} onPurchase={handlePurchase} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="case" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donateItems.filter(i => i.type === 'case').map((item) => (
                <DonateCard key={item.id} item={item} onPurchase={handlePurchase} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="item" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donateItems.filter(i => i.type === 'item').map((item) => (
                <DonateCard key={item.id} item={item} onPurchase={handlePurchase} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donateItems.filter(i => i.type === 'currency').map((item) => (
                <DonateCard key={item.id} item={item} onPurchase={handlePurchase} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="minecraft-shadow">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name={typeIcons[selectedItem?.type || 'privilege']} size={24} />
              {selectedItem?.name}
            </DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.benefits && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Что входит:</h4>
                <ul className="space-y-1">
                  {selectedItem.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-0.5" size={16} />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-3xl font-bold text-primary">{selectedItem?.price} ₽</div>
              <Button size="lg" className="minecraft-shadow hover-lift">
                <Icon name="ShoppingCart" className="mr-2" size={18} />
                Купить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="minecraft-shadow max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="User" size={24} />
              Личный кабинет
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-card rounded minecraft-shadow">
              <div className="w-16 h-16 bg-primary flex items-center justify-center rounded minecraft-shadow">
                <Icon name="User" className="text-primary-foreground" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{nickname}</h3>
                <p className="text-muted-foreground">Игрок сервера</p>
              </div>
              <Badge className="minecraft-shadow bg-secondary">VIP</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card className="minecraft-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Coins" size={16} />
                    Баланс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{balance} ₽</div>
                </CardContent>
              </Card>

              <Card className="minecraft-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="ShoppingBag" size={16} />
                    Покупок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">12</div>
                </CardContent>
              </Card>

              <Card className="minecraft-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    Онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">48ч</div>
                </CardContent>
              </Card>
            </div>

            <Card className="minecraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={20} />
                  История покупок
                </CardTitle>
                <CardDescription>Последние транзакции</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'VIP привилегия', price: 199, date: '15.10.2025' },
                    { name: 'Игровая валюта', price: 99, date: '10.10.2025' },
                    { name: 'Алмазный кейс', price: 299, date: '05.10.2025' }
                  ].map((purchase, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded">
                      <div>
                        <div className="font-medium text-foreground">{purchase.name}</div>
                        <div className="text-sm text-muted-foreground">{purchase.date}</div>
                      </div>
                      <div className="font-bold text-primary">{purchase.price} ₽</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function DonateCard({ item, onPurchase }: { item: DonateItem; onPurchase: (item: DonateItem) => void }) {
  return (
    <Card className="minecraft-shadow hover-lift overflow-hidden group cursor-pointer" onClick={() => onPurchase(item)}>
      <div className={`h-2 ${rarityColors[item.rarity || 'common']}`} />
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className={`w-12 h-12 ${rarityColors[item.rarity || 'common']} flex items-center justify-center minecraft-shadow`}>
            <Icon name={typeIcons[item.type]} className="text-white" size={24} />
          </div>
          <Badge variant="secondary" className="minecraft-shadow">
            {item.type === 'privilege' ? 'Привилегия' : 
             item.type === 'case' ? 'Кейс' : 
             item.type === 'item' ? 'Предмет' : 'Валюта'}
          </Badge>
        </div>
        <CardTitle className="text-xl">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{item.price} ₽</div>
          <Button className="minecraft-shadow group-hover:scale-105 transition-transform">
            <Icon name="ShoppingCart" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Index;