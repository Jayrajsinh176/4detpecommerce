<?php

namespace App\Filament\Resources\ShoppeeProductRequests\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;   // ← v4 correct namespace
use Filament\Infolists\Components\TextEntry;

class ShoppeeProductRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Product Info')
                    ->icon('heroicon-o-shopping-bag')
                    ->columns(1)
                    ->schema([
                        TextEntry::make('product.productname')
                            ->label('Product')
                            ->icon('heroicon-o-cube')
                            ->weight(\Filament\Support\Enums\FontWeight::Medium),
                    ]),

                Section::make('Order Summary')
                    ->icon('heroicon-o-chart-bar')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('quantity')
                            ->label('Quantity')
                            ->icon('heroicon-o-archive-box')
                            ->numeric(),

                        TextEntry::make('total_products')
                            ->label('Total Products')
                            ->icon('heroicon-o-arrow-trending-up')
                            ->numeric(),

                        TextEntry::make('total_pv')
                            ->label('Total PV')
                            ->icon('heroicon-o-information-circle')
                            ->numeric(),
                    ]),

                Section::make('Financial')
                    ->icon('heroicon-o-currency-dollar')
                    ->columns(1)
                    ->schema([
                        TextEntry::make('total_amount')
                            ->label('Total Amount')
                            ->icon('heroicon-o-banknotes')
                            ->money('PHP')
                           
                            ->weight(\Filament\Support\Enums\FontWeight::Bold),
                            // ↑ no ->color() here — this was causing the yellow line
                    ]),

                Section::make('Status')
                    ->icon('heroicon-o-flag')
                    ->columns(1)
                    ->schema([
                        TextEntry::make('status')
                            ->label('Request Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'approved'  => 'success',
                                'pending'   => 'warning',
                                'rejected'  => 'danger',
                                'cancelled' => 'gray',
                                default     => 'info',
                            }),
                    ]),
            ]);
    }
}