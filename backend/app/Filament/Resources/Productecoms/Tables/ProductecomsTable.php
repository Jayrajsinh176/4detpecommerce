<?php

namespace App\Filament\Resources\Productecoms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductecomsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('brand')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('price')
                    ->label('Price')
                    ->formatStateUsing(fn($state) => '₹' . number_format($state, 2)),

                TextColumn::make('offer_price')
                    ->label('Offer Price')
                    ->formatStateUsing(fn($state) => $state ? '₹' . number_format($state, 2) : '-'),


                TextColumn::make('discount_percentage')
                    ->label('Discount')
                    ->suffix('%')
                    ->badge()
                    ->color(fn($state) => $state > 0 ? 'success' : 'gray'),
                ImageColumn::make('image')
                    ->disk('public'),
                TextColumn::make('category.name')
                    ->label('Category'),
                IconColumn::make('is_viral')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('category_id')
                    ->numeric()
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
