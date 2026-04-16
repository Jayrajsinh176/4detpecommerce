<?php

namespace App\Filament\Resources\ShoppeHelpdesks\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class ShoppeHelpdesksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

             Tables\Columns\TextColumn::make('member.fullname')
    ->label('Member Name')
    ->searchable()
    ->sortable()
    ->default('N/A'),

                Tables\Columns\TextColumn::make('subject')
                    ->searchable()
                    ->limit(30),

                Tables\Columns\TextColumn::make('message')
                    ->limit(40),

                Tables\Columns\TextColumn::make('admin_reply')
                    ->label('Reply')
                    ->limit(40),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'open',
                        'danger' => 'closed',
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y'),
            ])

            ->defaultSort('id', 'desc')

            ->recordActions([
                EditAction::make()
                    ->label('Reply')
                    ->color('success'),
            ])

            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}