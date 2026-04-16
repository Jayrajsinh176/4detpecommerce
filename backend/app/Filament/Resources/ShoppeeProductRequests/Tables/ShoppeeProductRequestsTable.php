<?php

namespace App\Filament\Resources\ShoppeeProductRequests\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\ViewAction;

class ShoppeeProductRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('id'),

                Tables\Columns\TextColumn::make('product.productname')
                    ->label('Product')
                    ->searchable(),

                Tables\Columns\TextColumn::make('quantity'),

                Tables\Columns\TextColumn::make('total_products'),

                Tables\Columns\TextColumn::make('total_amount')
                    ->money('INR'),

                Tables\Columns\TextColumn::make('total_pv'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => match (strtolower($state)) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
            ])

            ->recordActions([
                ViewAction::make(),
            ])

            ->toolbarActions([]); // ❌ no create
    }
}