<?php

namespace App\Filament\Widgets;

use App\Models\Orderecom;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentOrders extends TableWidget
{
    protected static ?string $heading = 'Recent Orders';

    protected int|string|array $columnSpan = 'full'; // 🔥 THIS LINE

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Orderecom::query()->latest()->limit(5))
            ->columns([

                // 📦 Order ID
                Tables\Columns\TextColumn::make('id')
                    ->label('Order ID')
                    ->sortable(),

                // 👤 Customer Name
                Tables\Columns\TextColumn::make('member.fullname')
                    ->label('Customer')
                    ->searchable(),

                // 💰 Amount
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Amount')
                    ->money('INR'),

                // 🚦 Status
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'primary' => 'processing',
                        'info' => 'dispatched',
                        'success' => 'delivered',
                        'danger' => 'cancelled',
                    ]),

                // 📅 Date
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime(),

            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                //
            ])
            ->toolbarActions([
                //
            ]);
    }
}