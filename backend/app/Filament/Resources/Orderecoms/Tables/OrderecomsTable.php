<?php

namespace App\Filament\Resources\Orderecoms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OrderecomsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

    TextColumn::make('id')
    ->label('Order ID')
    ->sortable(),

TextColumn::make('member.fullname')
    ->label('Customer')
    ->searchable()
    ->sortable(),

TextColumn::make('member.mobile_no')
    ->label('Mobile'),
TextColumn::make('member.address')
    ->label('Address')
    ->wrap(),

TextColumn::make('total_amount')
    ->label('Total Amount')
    ->money('INR') // 🔥 formatted
    ->sortable(),
TextColumn::make('created_at')
    ->label('Order Date')
    ->dateTime()
    ->sortable(),
    
TextColumn::make('status')
    ->badge()
    ->colors([
        'warning' => 'pending',
        'primary' => 'processing',
        'info' => 'dispatched',
        'success' => 'delivered',
        'danger' => 'cancelled',
    ]),

TextColumn::make('created_at')
    ->label('Order Date')
    ->dateTime()
    ->sortable(),
])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
