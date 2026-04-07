<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Orderecom;
use App\Models\Productecom;
use App\Models\Categoryecom;
use App\Models\Memberecom;
use Carbon\Carbon;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [

        // 👥 Total Members
            Stat::make('Total Members', Memberecom::count())
                ->description('Registered users')
                ->color('info'),

            // 📦 Total Orders
            Stat::make('Total Orders', Orderecom::count())
                ->description('All orders')
                ->color('primary'),

            // 🟡 Today's Orders
            Stat::make("Today's Orders",
                Orderecom::whereDate('created_at', Carbon::today())->count()
            )
                ->description('Orders placed today')
                ->color('warning'),

            
            // 🛒 Total Products
            Stat::make('Total Products', Productecom::count())
                ->description('All products')
                ->color('success'),

            // 🗂 Total Categories
            Stat::make('Total Categories', Categoryecom::count())
                ->description('All categories')
                ->color('primary'),

            // 💰 Total Revenue
            Stat::make('Total Revenue', '₹' . Orderecom::sum('total_amount'))
                ->description('Total earnings')
                ->color('success'),

        ];
    }
}